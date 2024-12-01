package com.kotkipieski.backend.offers.services.impl;

import com.kotkipieski.backend.offers.dtos.WalkOfferCreatorViewDto;
import com.kotkipieski.backend.offers.dtos.WalkOfferSearchViewDto;
import com.kotkipieski.backend.offers.entities.WalkOffer;
import com.kotkipieski.backend.offers.entities.WalkOfferStatus;
import com.kotkipieski.backend.offers.exceptions.OfferNotFoundException;
import com.kotkipieski.backend.offers.mappers.CreateWalkOfferRequestMapper;
import com.kotkipieski.backend.offers.mappers.UpdateWalkOfferRequestMapper;
import com.kotkipieski.backend.offers.mappers.WalkOfferCreatorDtoMapper;
import com.kotkipieski.backend.offers.mappers.WalkOfferSearchViewDtoMapper;
import com.kotkipieski.backend.offers.repositories.WalkOfferRepository;
import com.kotkipieski.backend.offers.requests.CreateWalkOfferRequest;
import com.kotkipieski.backend.offers.requests.SearchWalkOfferSortByType;
import com.kotkipieski.backend.offers.requests.SearchWalkOffersRequest;
import com.kotkipieski.backend.offers.requests.UpdateWalkOfferRequest;
import com.kotkipieski.backend.offers.services.IWalkOfferService;
import com.kotkipieski.backend.pets.entities.PetOwner;
import com.kotkipieski.backend.pets.services.IPetService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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
  public Page<WalkOfferSearchViewDto> searchWalkOffers(SearchWalkOffersRequest searchRequest)
  {
    Sort sort = Optional.ofNullable(searchRequest.getSortBy())
        .map(SearchWalkOfferSortByType::getValue)
        .map(sortField -> Sort.by(Sort.Direction.fromString(searchRequest.getSortDirection()),
            sortField))
        .orElseGet(Sort::unsorted);

    Pageable pageable = PageRequest.of(searchRequest.getPage(), searchRequest.getPageSize(), sort);
    Page<WalkOffer> walkOffers = walkOfferRepository.findByLocationWithinRadiusAndFilters(
        searchRequest.getLongitude(), searchRequest.getLatitude(), searchRequest.getRadius(),
        searchRequest.getPriceFrom(), searchRequest.getPriceTo(),
        searchRequest.getWalkDateStartLimit(), searchRequest.getWalkDateEndLimit(),
        searchRequest.getMinTime(), searchRequest.getMaxTime(), pageable);

    return walkOffers.map(
        walkOffer -> walkOfferSearchViewDtoMapper.toDto(walkOffer, searchRequest));
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
