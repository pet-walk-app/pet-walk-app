package com.petwalkapp.backend.offers.services.impl;

import com.petwalkapp.backend.common.dtos.PageDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.petwalkapp.backend.offers.dtos.WalkOfferSearchViewDto;
import com.petwalkapp.backend.offers.entities.WalkOffer;
import com.petwalkapp.backend.offers.entities.WalkOfferStatus;
import com.petwalkapp.backend.offers.exceptions.OfferNotFoundException;
import com.petwalkapp.backend.offers.mappers.CreateWalkOfferRequestMapper;
import com.petwalkapp.backend.offers.mappers.UpdateWalkOfferRequestMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferCreatorDtoMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferSearchViewDtoMapper;
import com.petwalkapp.backend.offers.mappers.WalkOfferSearchViewPageMapper;
import com.petwalkapp.backend.offers.repositories.WalkOfferRepository;
import com.petwalkapp.backend.offers.requests.CreateWalkOfferRequest;
import com.petwalkapp.backend.offers.requests.SearchWalkOfferSortByType;
import com.petwalkapp.backend.offers.requests.SearchWalkOffersRequest;
import com.petwalkapp.backend.offers.requests.UpdateWalkOfferRequest;
import com.petwalkapp.backend.offers.services.IWalkOfferService;
import com.petwalkapp.backend.pets.entities.PetOwner;
import com.petwalkapp.backend.pets.services.IPetService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
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
  private final WalkOfferCreatorDtoMapper walkOfferCreatorDtoMapper;
  private final WalkOfferSearchViewDtoMapper walkOfferSearchViewDtoMapper;
  private final WalkOfferSearchViewPageMapper walkOfferSearchViewPageMapper;
  private final IPetService petService;

  @Override
  public WalkOfferCreatorViewDto createWalkOffer(CreateWalkOfferRequest createWalkOfferRequest)
  {
    WalkOffer walkOffer = createWalkOfferRequestMapper.toWalkOffer(createWalkOfferRequest);

    walkOffer = walkOfferRepository.save(walkOffer);
    return walkOfferCreatorDtoMapper.toDto(walkOffer);
  }

  @Override
  public List<WalkOfferCreatorViewDto> getUserWalkOffers()
  {
    PetOwner petOwner = petService.getCurrentPetOwner();

    return Optional.of(petOwner)
        .map(PetOwner::getWalkOffers)
        .orElseGet(List::of)
        .stream()
        .map(walkOfferCreatorDtoMapper::toDto)
        .toList();
  }

  @Override
  public WalkOfferCreatorViewDto getUserWalkOffer(Long id)
  {
    PetOwner petOwner = petService.getCurrentPetOwner();

    return Optional.of(petOwner)
        .map(PetOwner::getWalkOffers)
        .orElseGet(List::of)
        .stream()
        .filter(walkOffer -> walkOffer.getId().equals(id))
        .map(walkOfferCreatorDtoMapper::toDto)
        .findFirst()
        .orElseThrow(OfferNotFoundException::new);
  }

  @Override
  public WalkOfferCreatorViewDto updateUserWalkOffer(Long id,
      @Valid UpdateWalkOfferRequest updateWalkOfferRequest)
  {
    PetOwner petOwner = petService.getCurrentPetOwner();

    WalkOffer walkOffer = getWalkOffer(id, petOwner);

    updateWalkOfferRequestMapper.updateWalkOfferFromDto(updateWalkOfferRequest, walkOffer,
        petService);

    walkOffer = walkOfferRepository.save(walkOffer);

    return walkOfferCreatorDtoMapper.toDto(walkOffer);
  }

  @Override
  public WalkOfferCreatorViewDto deleteUserWalkOffer(Long id)
  {
    PetOwner petOwner = petService.getCurrentPetOwner();
    WalkOffer walkOffer = getWalkOffer(id, petOwner);
    walkOffer.setStatus(WalkOfferStatus.CANCELLED);

    walkOffer = walkOfferRepository.save(walkOffer);
    return walkOfferCreatorDtoMapper.toDto(walkOffer);
  }

  @Override
  public PageDto<WalkOfferSearchViewDto> searchWalkOffers(SearchWalkOffersRequest searchRequest)
  {
    Sort sort = Optional.ofNullable(searchRequest.getSortBy())
        .map(SearchWalkOfferSortByType::getValue)
        .map(sortField -> Sort.by(Sort.Direction.fromString(searchRequest.getSortDirection()
            .getValue()), sortField))
        .orElseGet(Sort::unsorted);

    LocalDate walkDateStartLimit = Optional.ofNullable(searchRequest.getWalkDateStartLimit())
        .filter(localDate -> !localDate.isBefore(LocalDate.now()))
        .orElse(LocalDate.now());

    Pageable pageable = PageRequest.of(searchRequest.getPage(), searchRequest.getPageSize(), sort);
    Page<WalkOffer> walkOffers = walkOfferRepository.findByLocationWithinRadiusAndFilters(
        searchRequest.getLongitude(), searchRequest.getLatitude(), searchRequest.getRadius(),
        searchRequest.getPriceFrom(), searchRequest.getPriceTo(), walkDateStartLimit, searchRequest
            .getWalkDateEndLimit(), searchRequest.getMinTime(), searchRequest.getMaxTime(),
        pageable);

    return walkOfferSearchViewPageMapper.toPageDto(walkOffers.map(
        walkOffer -> walkOfferSearchViewDtoMapper.toDto(walkOffer, searchRequest)));
  }

  private static WalkOffer getWalkOffer(Long id, PetOwner petOwner)
  {
    return Optional.of(petOwner)
        .map(PetOwner::getWalkOffers)
        .orElseGet(List::of)
        .stream()
        .filter(offer -> offer.getId().equals(id))
        .findFirst()
        .orElseThrow(OfferNotFoundException::new);
  }
}
