package com.petwalkapp.backend.offers.services.impl;

import com.petwalkapp.backend.care.CaregiverUtils;
import com.petwalkapp.backend.care.entities.Caregiver;
import com.petwalkapp.backend.care.services.impl.CaregiverService;
import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.common.requests.SortDirectionType;
import com.petwalkapp.backend.common.utils.PageUtils;
import com.petwalkapp.backend.offers.contexts.CaregiverMappingContext;
import com.petwalkapp.backend.offers.contexts.SearchMappingContext;
import com.petwalkapp.backend.offers.dtos.WalkOfferAcceptedViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferPendingViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.entities.WalkOfferApplication;
import com.petwalkapp.backend.offers.entities.WalkOfferStatus;
import com.petwalkapp.backend.offers.exceptions.AlreadyAppliedException;
import com.petwalkapp.backend.offers.exceptions.ApplicationNotFound;
import com.petwalkapp.backend.offers.exceptions.OfferNotFoundException;
import com.petwalkapp.backend.offers.mappers.CreateWalkOfferRequestMapper;
import com.petwalkapp.backend.offers.mappers.UpdateWalkOfferRequestMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferAcceptedViewDtoMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferCreatorViewDtoMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferPendingViewDtoMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferSearchViewDtoMapper;
import com.petwalkapp.backend.offers.repositories.WalkOfferRepository;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.SearchWalkOfferSortByType;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import com.petwalkapp.backend.pets.entities.PetOwner;
import com.petwalkapp.backend.pets.services.IPetService;
import com.petwalkapp.backend.security.exceptions.NotAllowedException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class WalkOfferService implements IWalkOfferService
{

  private final WalkOfferRepository walkOfferRepository;
  private final CreateWalkOfferRequestMapper createWalkOfferRequestMapper;
  private final UpdateWalkOfferRequestMapper updateWalkOfferRequestMapper;
  private final WalkOfferCreatorViewDtoMapper walkOfferCreatorViewDtoMapper;
  private final WalkOfferPendingViewDtoMapper walkOfferPendingViewDtoMapper;
  private final WalkOfferSearchViewDtoMapper walkOfferSearchViewDtoMapper;
  private final WalkOfferAcceptedViewDtoMapper walkOfferAcceptedViewDtoMapper;
  private final IPetService petService;
  private final CaregiverService caregiverService;

  private static void validateOfferCanBeUpdated(WalkOffer walkOffer, PetOwner petOwner)
  {
    if (walkOffer.getStatus() != WalkOfferStatus.OPEN) {
      throw new NotAllowedException();
    }

    if (!petOwner.getId().equals(walkOffer.getPetOwner().getId())) {
      throw new NotAllowedException();
    }
  }

  private static Pageable getDefaultPageable(Integer page, Integer pageSize)
  {
    return PageUtils.createPageable(page, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
  }

  @Override
  public WalkOfferCreatorViewDto createWalkOffer(CreateWalkOfferRequest createWalkOfferRequest)
  {
    WalkOffer walkOffer = createWalkOfferRequestMapper.toWalkOffer(createWalkOfferRequest);

    walkOffer = walkOfferRepository.save(walkOffer);
    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public PageDto<WalkOfferCreatorViewDto> getUserWalkOffers(Integer page, Integer pageSize)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    Pageable pageable = getDefaultPageable(page, pageSize);

    return walkOfferCreatorViewDtoMapper.toPageDto(
        walkOfferRepository.findWalkOfferByPetOwner(petOwner, pageable));
  }

  @Override
  public WalkOfferCreatorViewDto getUserWalkOffer(Long id)
  {
    WalkOffer walkOffer = getWalkOfferCreatedByUser(id, petService.getCurrentPetOwnerOrThrow());

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto updateUserWalkOffer(Long id,
      @Valid UpdateWalkOfferRequest updateWalkOfferRequest)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();

    WalkOffer walkOffer = getWalkOfferCreatedByUser(id, petOwner);

    if (walkOffer.getStatus() != WalkOfferStatus.OPEN) {
      throw new NotAllowedException();
    }

    updateWalkOfferRequestMapper.updateWalkOfferFromDto(updateWalkOfferRequest, walkOffer,
        petService);

    walkOffer = walkOfferRepository.save(walkOffer);

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto deleteUserWalkOffer(Long id)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    WalkOffer walkOffer = getWalkOfferCreatedByUser(id, petOwner);
    walkOffer.setStatus(WalkOfferStatus.CANCELLED);

    walkOffer = walkOfferRepository.save(walkOffer);
    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public PageDto<WalkOfferSearchViewDto> searchWalkOffers(SearchWalkOffersRequest searchRequest,
      Integer page, Integer pageSize, SearchWalkOfferSortByType sortBy,
      SortDirectionType sortDirection, Double latitude, Double longitude)
  {
    Sort sort = Optional.ofNullable(sortBy)
        .map(SearchWalkOfferSortByType::getField)
        .map(sortField -> Sort.by(Sort.Direction.fromString(sortDirection.getValue()), sortField))
        .orElseGet(() -> Sort.by(Sort.Order.asc(SearchWalkOfferSortByType.DISTANCE.getField()))
            .and(Sort.by(Sort.Order.desc(SearchWalkOfferSortByType.CREATION_TIME.getField()))));

    LocalDate walkDateFrom = Optional.ofNullable(searchRequest.getWalkDateFrom())
        .filter(localDate -> !localDate.isBefore(LocalDate.now()))
        .orElse(LocalDate.now());

    Pageable pageable = PageRequest.of(page, pageSize, sort);
    Page<WalkOffer> walkOffers = walkOfferRepository.findByLocationWithinRadiusAndFilters(
        longitude, latitude, searchRequest.getRadius(),
        searchRequest.getPriceFrom(), searchRequest.getPriceTo(), walkDateFrom,
        searchRequest.getWalkDateTo(), searchRequest.getMinTime(), searchRequest.getMaxTime(),
        pageable);

    Caregiver currentCaregiver = caregiverService.getCurrentCaregiver();
    return walkOfferSearchViewDtoMapper.toPageDto(walkOffers, SearchMappingContext.builder()
        .searchRequest(searchRequest)
        .currentCaregiver(currentCaregiver)
        .latitude(latitude)
        .longitude(longitude)
        .build());
  }

  @Override
  public WalkOfferPendingViewDto getPendingOffer(Long offerId, Double latitude, Double longitude)
  {
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    WalkOffer walkOffer = walkOfferRepository.findWalkOfferById(offerId)
        .orElseThrow(OfferNotFoundException::new);

    WalkOfferApplication matchingOfferApplication = CaregiverUtils.findMatchingOfferApplication(
        walkOffer, caregiver);

    if (Objects.isNull(matchingOfferApplication) || matchingOfferApplication.isRejected()
        || walkOffer.getStatus() != WalkOfferStatus.OPEN || walkOffer.getWalkDate()
            .isBefore(ChronoLocalDate.from(LocalDateTime.now()))) {
      throw new NotAllowedException();
    }

    return walkOfferPendingViewDtoMapper.toDto(walkOffer, CaregiverMappingContext.builder()
        .longitude(longitude)
        .latitude(latitude)
        .currentCaregiver(caregiver)
        .build());
  }

  @Override
  public PageDto<WalkOfferPendingViewDto> getPendingOffers(Integer page, Integer pageSize,
      Double latitude, Double longitude)
  {
    Pageable pageable = getDefaultPageable(page, pageSize);
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    Page<WalkOffer> walkOffers = walkOfferRepository.findPendingWalkOffers(caregiver,
        LocalDate.now(), pageable);

    return walkOfferPendingViewDtoMapper.toPageDto(walkOffers, CaregiverMappingContext.builder()
        .longitude(longitude)
        .latitude(latitude)
        .currentCaregiver(caregiver)
        .build());
  }

  @Override
  public WalkOfferAcceptedViewDto getAcceptedOffer(Long offerId, Double latitude, Double longitude)
  {
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    WalkOffer walkOffer = walkOfferRepository.findWalkOfferById(offerId)
        .orElseThrow(OfferNotFoundException::new);

    if (Objects.isNull(walkOffer.getSelectedCaregiver()) || !caregiver.getId()
        .equals(walkOffer.getSelectedCaregiver().getId())) {
      throw new NotAllowedException();
    }

    return walkOfferAcceptedViewDtoMapper.toDto(walkOffer, CaregiverMappingContext.builder()
        .longitude(longitude)
        .latitude(latitude)
        .currentCaregiver(caregiver)
        .build());
  }

  @Override
  public PageDto<WalkOfferAcceptedViewDto> getAcceptedOffers(Integer page, Integer pageSize,
      Double latitude, Double longitude)
  {
    Pageable pageable = getDefaultPageable(page, pageSize);
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    Page<WalkOffer> walkOffers = walkOfferRepository.findAcceptedWalkOffers(caregiver, pageable);

    return walkOfferAcceptedViewDtoMapper.toPageDto(walkOffers, CaregiverMappingContext.builder()
        .longitude(longitude)
        .latitude(latitude)
        .currentCaregiver(caregiver)
        .build());
  }

  @Override
  public void applyForOffer(Long offerId)
  {
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    WalkOffer walkOffer = walkOfferRepository.findWalkOfferById(offerId)
        .orElseThrow(OfferNotFoundException::new);

    if (walkOffer.getStatus() != WalkOfferStatus.OPEN) {
      throw new NotAllowedException();
    }

    if (walkOffer.getWalkDate().isBefore(ChronoLocalDate.from(LocalDateTime.now()))) {
      throw new NotAllowedException();
    }

    if (CaregiverUtils.didCaregiverAppliedForOffer(walkOffer, caregiver)) {
      throw new AlreadyAppliedException();
    }

    if (caregiver.getUser() == walkOffer.getPetOwner().getUser()) {
      throw new NotAllowedException();
    }

    walkOffer.getWalkOfferApplications()
        .add(WalkOfferApplication.builder()
            .caregiver(caregiver)
            .walkOffer(walkOffer)
            .applicationDate(LocalDateTime.now())
            .build());

    walkOfferRepository.save(walkOffer);
  }

  @Override
  public void removeApplicationForOffer(Long offerId)
  {
    Caregiver caregiver = caregiverService.getCurrentCaregiverOrThrow();
    WalkOffer walkOffer = walkOfferRepository.findWalkOfferById(offerId)
        .orElseThrow(OfferNotFoundException::new);

    WalkOfferApplication walkOfferApplication = CaregiverUtils.findMatchingOfferApplication(
        walkOffer, caregiver);

    if (Objects.isNull(walkOfferApplication) || walkOfferApplication.isRejected()) {
      throw new NotAllowedException();
    }

    walkOffer.getWalkOfferApplications().remove(walkOfferApplication);

    walkOfferRepository.save(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto acceptApplication(Long offerId, Long applicationId)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    WalkOffer walkOffer = getWalkOfferCreatedByUser(offerId, petOwner);

    validateOfferCanBeUpdated(walkOffer, petOwner);

    Caregiver caregiver = Optional.ofNullable(walkOffer.getWalkOfferApplications())
        .orElseGet(ArrayList::new)
        .stream()
        .filter(application -> application.getId().equals(applicationId))
        .filter(application -> !application.isRejected())
        .map(WalkOfferApplication::getCaregiver)
        .findFirst()
        .orElseThrow(ApplicationNotFound::new);

    if (Objects.isNull(caregiver)) {
      throw new NotAllowedException();
    }

    walkOffer.setSelectedCaregiver(caregiver);
    walkOffer.setStatus(WalkOfferStatus.ACCEPTED);

    walkOffer = walkOfferRepository.save(walkOffer);

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto undoAcceptApplication(Long offerId)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    WalkOffer walkOffer = getWalkOfferCreatedByUser(offerId, petOwner);

    if (!petOwner.getId().equals(walkOffer.getPetOwner().getId())) {
      throw new NotAllowedException();
    }

    if (Objects.isNull(walkOffer.getSelectedCaregiver())) {
      throw new NotAllowedException();
    }

    walkOffer.setSelectedCaregiver(null);
    walkOffer.setStatus(WalkOfferStatus.OPEN);

    walkOffer = walkOfferRepository.save(walkOffer);

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto rejectApplication(Long offerId, Long applicationId)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    WalkOffer walkOffer = getWalkOfferCreatedByUser(offerId, petOwner);

    validateOfferCanBeUpdated(walkOffer, petOwner);

    WalkOfferApplication walkOfferApplication = Optional.ofNullable(
        walkOffer.getWalkOfferApplications())
        .orElseGet(ArrayList::new)
        .stream()
        .filter(application -> application.getId().equals(applicationId))
        .findFirst()
        .orElseThrow(ApplicationNotFound::new);

    walkOfferApplication.setRejected(true);

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto undoRejectApplication(Long offerId, Long applicationId)
  {
    PetOwner petOwner = petService.getCurrentPetOwnerOrThrow();
    WalkOffer walkOffer = getWalkOfferCreatedByUser(offerId, petOwner);

    validateOfferCanBeUpdated(walkOffer, petOwner);

    WalkOfferApplication walkOfferApplication = Optional.ofNullable(
        walkOffer.getWalkOfferApplications())
        .orElseGet(ArrayList::new)
        .stream()
        .filter(Objects::nonNull)
        .filter(application -> application.getId().equals(applicationId))
        .findFirst()
        .orElseThrow(ApplicationNotFound::new);

    walkOfferApplication.setRejected(false);

    return walkOfferCreatorViewDtoMapper.toDto(walkOffer);
  }

  private WalkOffer getWalkOfferCreatedByUser(Long offerId, PetOwner petOwner)
  {
    WalkOffer walkOffer = walkOfferRepository.findWalkOfferById(offerId)
        .orElseThrow(OfferNotFoundException::new);

    if (!walkOffer.getPetOwner().getId().equals(petOwner.getId())) {
      throw new NotAllowedException();
    }

    return walkOffer;
  }
}
