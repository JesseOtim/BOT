'use client';

import { useEffect, useState } from 'react';

import { getCurrencyFormat } from '@/lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ReservationSummaryAlert } from './reservation-summary-alert';

interface SeeMoreButtonProps {
  buttonText?: string;
  onClick?: () => void;
}

export function ReservationsSummary({
  selectedGuestDetails,
  selectedRooms,
  selectedAllFacilities,
  numberOfDays,
  totalPriceOfAddedFacilities,
  totalReservationPrice,
  roomsError,
  removeRoom,
  dateErrorMessage,
  calculateTotalPriceForSelctedRooms,
  removeAllFacilities,
  calculateTotalPriceForSelctedFacilities,
  taxRate,
  discountsRate,
  setSelectedAllFacilities,
  setSelectedRooms,
  setNumberOfDays,
}: any) {
  const [daysWithAssignedRooms, setDaysWithAssignedRooms] = useState<any>([]);
  const [overallTotal, setOverallTotal] = useState(0);
  const [overallTotalWithDiscount, setOverallTotalWithDiscount] = useState(0);
  const [overallTotalWithDiscountAndTax, setOverallTotalWithDiscountAndTax] =
    useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const [removedRooms, setRemovedRooms] = useState<any>({});
  const [removedFacilities, setRemovedFacilities] = useState<any>({});

  const [showNotification, setShowNotification] = useState(false);

  const calculateOverallTotal = (daysWithAssignedRooms: any) => {
    const overallTotal = daysWithAssignedRooms.reduce(
      (total: any, day: any) => total + day.total,
      0
    );
    setOverallTotal(overallTotal);
  };

  const calculateTotalWithoutTax = (daysWithAssignedRooms: any) => {
    const totalWithoutTax = daysWithAssignedRooms.reduce(
      (total: any, day: any) => total + day.totalWithoutTax,
      0
    );
    setTotalWithoutTax(totalWithoutTax);
  };

  const calculateDiscountedTotal = (total: number, discountRate: number) => {
    const discount = (total * discountRate) / 100;
    return total - discount;
  };

  const calculateDiscountedTotalWithTax = (
    total: number,
    discountRate: number,
    taxRate: number
  ) => {
    const discount = (total * discountRate) / 100;
    const discountedTotal = total - discount;
    const discountedTotalWithTax =
      discountedTotal + (discountedTotal * taxRate) / 100;
    return discountedTotalWithTax;
  };

  // // to assign rooms and facilities to dates
  // const assignRoomsToDays = (
  //   numberOfDays: any,
  //   selectedRooms: any,
  //   taxRate: any,
  //   selectedAllFacilities: any
  // ) => {
  //   const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  //   return daysArray.map((day) => {
  //     const roomsTotal = selectedRooms.reduce(
  //       (total: any, room: any) => total + room.price,
  //       0
  //     );
  //     const facilitiesTotal = selectedAllFacilities.reduce(
  //       (total: any, facility: any) => total + facility.price,
  //       0
  //     );
  //     const totalWithoutTax = roomsTotal + facilitiesTotal;
  //     const totalWithTax = totalWithoutTax + (totalWithoutTax * taxRate) / 100;
  //     return {
  //       day,
  //       rooms: [...selectedRooms],
  //       facilities: [...selectedAllFacilities],
  //       total: totalWithTax,
  //       totalWithoutTax: totalWithoutTax,
  //       taxRate: taxRate,
  //     };
  //   });
  // };


  // Assign rooms and facilities to days
  const assignRoomsToDays = (
    numberOfDays: any,
    selectedRooms: any,
    taxRate: any,
    selectedAllFacilities: any,
    removedRooms: any,
    removedFacilities: any
  ) => {
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    return daysArray.map((day) => {
      // Filter out removed rooms for this day
      const availableRooms = selectedRooms.filter(
        (room: any) => !removedRooms[day]?.includes(room.id)
      );

      // Filter out removed facilities for this day
      const availableFacilities = selectedAllFacilities.filter(
        (facility: any) => !removedFacilities[day]?.includes(facility.id)
      );

      const roomsTotal = availableRooms.reduce(
        (total: any, room: any) => total + room.price,
        0
      );
      const facilitiesTotal = availableFacilities.reduce(
        (total: any, facility: any) => total + facility.price,
        0
      );
      const totalWithoutTax = roomsTotal + facilitiesTotal;
      const totalWithTax = totalWithoutTax + (totalWithoutTax * taxRate) / 100;

      return {
        day,
        rooms: availableRooms,
        facilities: availableFacilities,
        total: totalWithTax,
        totalWithoutTax: totalWithoutTax,
        taxRate: taxRate,
      };
    })
  };

  // updates the assigned rooms and facilities
  useEffect(() => {
    const dayWithAssignedRooms = assignRoomsToDays(
      numberOfDays,
      selectedRooms,
      taxRate,
      selectedAllFacilities,

      removedRooms,
      removedFacilities
    );
    setDaysWithAssignedRooms(dayWithAssignedRooms);
    calculateOverallTotal(dayWithAssignedRooms);
    calculateTotalWithoutTax(dayWithAssignedRooms);

  }, [numberOfDays, selectedRooms, taxRate, removedRooms, removedFacilities, selectedAllFacilities]);



  // Reset showNotification when numberOfDays changes
  useEffect(() => {
    setShowNotification(false);
  }, [numberOfDays]);

  // use effect for handling the days state
  useEffect(() => {
    if (showNotification) {
      setDaysWithAssignedRooms([]);
      setOverallTotal(0);
    }
  }, [showNotification]);

  // update no discount
  useEffect(() => {
    const discountedTotal = calculateDiscountedTotal(
      totalWithoutTax,
      discountsRate
    );
    setOverallTotalWithDiscount(discountedTotal);
  }, [totalWithoutTax, discountsRate]);

  // update discount
  useEffect(() => {
    const discountedTotal = calculateDiscountedTotalWithTax(
      totalWithoutTax,
      discountsRate,
      taxRate
    );
    setOverallTotalWithDiscountAndTax(discountedTotal);
  }, [totalWithoutTax, discountsRate, taxRate]);


  // remove
  // const removeDay = (day: any,
  //   roomId: any,
  //   setDaysWithAssignedRooms: any) => {
  //     const newDays = daysWithAssignedRooms.filter((day: any) => day.id !== day
  //     .id);
  //     setDaysWithAssignedRooms(newDays);
  //     };
  //     const removeFacility = (day: any,
  //       facilityId: any,
  //       setDaysWithAssignedRooms: any) => {
  //         const newDays = daysWithAssignedRooms.filter((day: any) => day.id !== day
  //         .id);
  //         setDaysWithAssignedRooms(newDays);
  //         };
  //         const removeRoom = (day: any,
  //           roomId: any,
  //           setDaysWithAssignedRooms: any) => {
  //             const newDays = daysWithAssignedRooms.filter((day: any) => day.id !== day
  //             .id);
  //             setDaysWithAssignedRooms(newDays);
  //             };
  //             const removeFacilityFromRoom = (day: any,
        
  // }  

  // remove rooms on days
  const removeRoomOnDays = (
    day: any,
    roomId: any,
    setDaysWithAssignedRooms: any
  ) => {
    setDaysWithAssignedRooms((prevDays: any) => {
      const updatedDays = prevDays.map((dayItem: any) => {
        if (dayItem.day === day) {
          const updatedRooms = dayItem.rooms.filter(
            (room: any) => room.id !== roomId
          );
          const roomsTotal = updatedRooms.reduce(
            (total: any, room: any) => total + room.price,
            0
          );
          const facilitiesTotal = dayItem.facilities.reduce(
            (total: any, facility: any) => total + facility.price,
            0
          );
          const totalWithoutTax = roomsTotal + facilitiesTotal;
          const totalWithTax =
            totalWithoutTax + (totalWithoutTax * taxRate) / 100;

          return {
            ...dayItem,
            rooms: updatedRooms,
            total: totalWithTax,
            totalWithoutTax: totalWithoutTax,
          };
        }
        return dayItem;
      });

      calculateOverallTotal(updatedDays);

      // Track removed rooms
      setRemovedRooms((prevRemovedRooms: any) => ({
        ...prevRemovedRooms,
        [day]: [...(prevRemovedRooms[day] || []), roomId]
      }));


      console.log('updatedDays',updatedDays);
      
      // Check if any day has no rooms or facilities and show notification
      const emptyDay = updatedDays.some(
        (day: any) => day.rooms.length === 0 && day.facilities.length === 0
      );
      setShowNotification(emptyDay);

      return updatedDays;
    });
  };

  // remove facilities on days
  const removeFacilityOnDays = (
    day: any,
    facilityId: any,
    setDaysWithAssignedRooms: any
  ) => {
    setDaysWithAssignedRooms((prevDays: any) => {
      const updatedDays = prevDays.map((dayItem: any) => {
        if (dayItem.day === day) {
          const updatedFacilities = dayItem.facilities.filter(
            (facility: any) => facility.id !== facilityId
          );
          const roomsTotal = dayItem.rooms.reduce(
            (total: any, room: any) => total + room.price,
            0
          );
          const facilitiesTotal = updatedFacilities.reduce(
            (total: any, facility: any) => total + facility.price,
            0
          );
          const totalWithoutTax = roomsTotal + facilitiesTotal;
          const totalWithTax =
            totalWithoutTax + (totalWithoutTax * taxRate) / 100;
          return {
            ...dayItem,
            facilities: updatedFacilities,
            total: totalWithTax,
            totalWithoutTax: totalWithoutTax,
          };
        }
        return dayItem;
      });

      calculateOverallTotal(updatedDays);

      // Track removed facilities
      setRemovedFacilities((prevRemovedFacilities: any) => ({
        ...prevRemovedFacilities,
        [day]: [...(prevRemovedFacilities[day] || []), facilityId]
      }));

      // Check if any day has no rooms or facilities and show notification
      const emptyDay = updatedDays.some(
        (day: any) => day.rooms.length === 0 && day.facilities.length === 0
      );
      setShowNotification(emptyDay);

      return updatedDays;
    });
  };


  // console.log('daysWithAssignedRooms', daysWithAssignedRooms);
  // console.log(
  //   'rooms',
  //   selectedRooms,
  //   'facilities',
  //   selectedAllFacilities,
  //   'days',
  //   numberOfDays
  // );

  return (
    <div>
      {/* notification */}
      {showNotification && (
        <div>
          <ReservationSummaryAlert />
        </div>
      )}

      {/* // setSelectedAllFacilities([]); */}
      {/* // setSelectedRooms([]); */}

      {/* {!showNotification && ( */}
      <>
        {selectedGuestDetails.first_name !== '' ? (
          <div>
            {selectedGuestDetails.first_name && (
              <div>
                <p className="text-sm font-medium">Returning guest details:</p>
                <div className="py-1 text-sm">
                  <p>
                    Name: {selectedGuestDetails.first_name}{' '}
                    {selectedGuestDetails.last_name}
                  </p>
                  <p>Email: {selectedGuestDetails.email}</p>
                  <p>Phone number: {selectedGuestDetails.phonenumber}</p>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {selectedRooms.length === 0 && selectedAllFacilities.length === 0 ? (
          <div>
            {/* selected facilities error */}
            {roomsError && <p className="text-red-500 text-sm">{roomsError}</p>}

            {roomsError === '' && (
              <p className="text-sm py-2 font-medium">
                Add reservation information before you can see the summary.
              </p>
            )}
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-1 font-normal">
              {numberOfDays !== null && numberOfDays >= 0 ? (
                <>
                  <p className="text-sm">Duration: {numberOfDays}</p>
                  <p className="text-sm">Discount rate: {discountsRate}</p>
                  {/* // discountsRate */}
                </>
              ) : (
                <p className="text-sm text-red-500">{dateErrorMessage}</p>
              )}
            </div>

            {/* days */}
            <div>
              <div>
                <h3 className="text-sm mt-4 font-bold">
                  Days and their assigned rooms
                </h3>
              </div>

              {daysWithAssignedRooms.map(
                ({
                  day,
                  rooms,
                  facilities,
                  total,
                  totalWithoutTax,
                  taxRate,
                }: any) => (
                  <div
                    key={day}
                    className="flex flex-col border-b border-gray-200 bg-white py-4 font-normal"
                  >
                    <p className="text-sm font-semibold">Day {day}:</p>
                    {rooms.map((room: any) => (
                      <div key={room.id} className="py-2">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-sm">
                              Room number: {room.roomNumber} ({room.roomType})
                            </p>
                            <p className="text-sm">
                              Price: {getCurrencyFormat(room.price, 'UGX')}
                            </p>
                          </div>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      removeRoomOnDays(
                                        day,
                                        room.id,
                                        setDaysWithAssignedRooms
                                      )
                                    }
                                    className="text-xs"
                                  >
                                    x
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">
                                    Remove selected room
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    ))}

                    {facilities.map((facility: any) => (
                      <div key={facility.id} className="py-2">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-sm">
                              Facility number: {facility.facilityNumber} (
                              {facility.facilityType})
                            </p>
                            <p className="text-sm">
                              Price: {getCurrencyFormat(facility.price, 'UGX')}
                            </p>
                          </div>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      removeFacilityOnDays(
                                        day,
                                        facility.id,
                                        setDaysWithAssignedRooms
                                      )
                                    }
                                    className="text-xs"
                                  >
                                    x
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">
                                    Remove selected facility
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    ))}

                    <p className="text-sm font-semibold">
                      Total rate: {taxRate}
                    </p>

                    <p className="text-sm font-semibold">
                      Total without tax {day}:{' '}
                      {getCurrencyFormat(totalWithoutTax, 'UGX')}
                    </p>
                    <p className="text-sm font-semibold">
                      Total for Day wit tax {day}:{' '}
                      {getCurrencyFormat(total, 'UGX')}
                    </p>
                  </div>
                )
              )}
            </div>

            <div>
              {daysWithAssignedRooms.length === 0 ? (
                ''
              ) : (
                <>
                  <div>
                    {taxRate === 0 ? (
                      <>
                        <p className="text-md font-bold mt-4">
                          Reservation price without tax:{' '}
                          {getCurrencyFormat(totalWithoutTax, 'UGX')}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-md font-bold mt-4">
                          Reservation price with tax:{' '}
                          {getCurrencyFormat(overallTotal, 'UGX')}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    {discountsRate === 0 ? (
                      ''
                    ) : (
                      <>
                        <p className="text-md font-bold mt-4">
                          Reservation price with discount:{' '}
                          {getCurrencyFormat(overallTotalWithDiscount, 'UGX')}
                        </p>
                        <p className="text-md font-bold mt-4">
                          Reservation price with discount & tax:{' '}
                          {getCurrencyFormat(
                            overallTotalWithDiscountAndTax,
                            'UGX'
                          )}
                        </p>
                      </>
                    )}
                    <div className="py-2 border-b border-gray-200"></div>

                    {discountsRate === 0 ? (
                      <>
                        <p className="py-2 text-md font-bold">
                          Amount to pay :{' '}
                          {getCurrencyFormat(overallTotal, 'UGX')}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="py-2 text-md font-bold">
                          Amount to pay :{' '}
                          {getCurrencyFormat(
                            overallTotalWithDiscountAndTax,
                            'UGX'
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
      {/* )} */}
    </div>
  );
}

