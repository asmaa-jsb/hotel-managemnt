/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Grid, Typography, ClickAwayListener } from "@mui/material";
import FacilityCard from "./FacilityCard";
import {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
} from "@/assets/Images";
import { useMemo, useState } from "react";
// @ts-ignore
import { DateRange } from "react-date-range";
import { differenceInDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReusableButton from "@/components/UserSharedModual/ReusableButton/ReusableButton";
import { useAddBooking } from "@/utils/Hooks/Hooks";
import { useForm } from "react-hook-form";
import type { CreateBooking } from "@/interfaces/Interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface IRoomBookingProps {
  price: number;
  discount: number;
  capacity: number;
  totalPrice: number;
  room: string;
  onPriceChange?: (price: number) => void;
}
const RoomBooking: React.FC<IRoomBookingProps> = ({
  room,
  price,
  discount,
  capacity,
  totalPrice,
  onPriceChange,
}) => {
  const { mutate: createBooking, isPending: isCreating } = useAddBooking();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange" });
  const [openCalendar, setOpenCalendar] = useState(false);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: "selection",
    },
  ]);
  const startDate = dateRange[0].startDate;
  const endDate = dateRange[0].endDate;

  // Price calculations with memoization
  const numberOfNights = useMemo(
    () => Math.max(1, differenceInDays(endDate, startDate)),
    [endDate, startDate]
  );

  const calculatedTotalPrice = useMemo(
    () => numberOfNights * price,
    [numberOfNights, price]
  );

  const priceAfterDiscount = useMemo(
    () => calculatedTotalPrice * (1 - discount / 100),
    [calculatedTotalPrice, discount]
  );
  useMemo(() => {
    if (onPriceChange) {
      onPriceChange(priceAfterDiscount);
    }
  }, [priceAfterDiscount, onPriceChange]);
  // Form submission handler
  const onSubmit = () => {
    if (endDate < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const bookingData: CreateBooking = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      room,
      totalPrice: Math.round(priceAfterDiscount),
    };
    console.log("Booking Data:", bookingData);
    createBooking(bookingData, {
      onSuccess: (data) => {
        toast.success("Booking  created successfully!");
        const bookingId = data.data.booking._id;
        console.log("Booking ID:", bookingId);
        navigate(`/payment/${bookingId}`);
        setOpenCalendar(false);

        setDateRange([
          {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
            key: "selection",
          },
        ]);
      },
      onError: (error) =>
        toast.error(error?.message || "Failed to create Booking."),
    });
  };
  return (
    <Grid
      container
      sx={{ mt: "5.625rem", padding: "20px" }}
      spacing={6}
      alignItems={"center"}
    >
      <Grid size={{ xs: 12, md: 6 }}>
        {/* left side */}
        <Box>
          <Typography className="roomDescription">
            Minimal techno is a minimalist subgenre of techno music. It is
            characterized by a stripped-down aesthetic that exploits the use of
            repetition and understated development. Minimal techno is thought to
            have been originally developed in the early 1990s by Detroit-based
            producers Robert Hood and Daniel Bell.
          </Typography>
          <Typography className="roomDescription" sx={{ my: "10px" }}>
            Such trends saw the demise of the soul-infused techno that typified
            the original Detroit sound. Robert Hood has noted that he and Daniel
            Bell both realized something was missing from techno in the
            post-rave era.
          </Typography>
          <Typography className="roomDescription">
            Design is a plan or specification for the construction of an object
            or system or for the implementation of an activity or process, or
            the result of that plan or specification in the form of a prototype,
            product or process. The national agency for design: enabling
            Singapore to use design for economic growth and to make lives
            better.
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ mt: "30px", justifyContent: "center" }}
        >
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon1} number={5} title="bedroom" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon2} number={1} title="living room" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon3} number={3} title="bathroom" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon4} number={1} title="dining room" />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          sx={{ mt: "30px" }}
        >
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon5} number={10} title="mbp/s" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon6} number={7} title="unit ready" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon7} number={2} title="refrigerator" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FacilityCard icon={icon8} number={4} title="television" />
          </Grid>
        </Grid>
      </Grid>
      {/* right side */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          className="booking-card "
          sx={{ textAlign: { md: "left", xs: "center" } }}
        >
          <Typography className="main-title" variant="h5" component={"h5"}>
            Start Booking
          </Typography>
          <Typography className="booking-title">
            <Typography component={"span"} className="price-span">
              ${price}
            </Typography>{" "}
            per night
          </Typography>
          <Typography className="discount">
            Discount {discount}% Off{" "}
          </Typography>
          {/* Booking Card */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
            className="Secondary-color"
          >
            {/* Date Picker */}
            <Typography sx={{ fontWeight: "600" }} variant="body1" mb={1}>
              Pick a Date
            </Typography>
            <ClickAwayListener onClickAway={() => setOpenCalendar(false)}>
              <Box sx={{ position: "relative", display: "flex", mb: 1.5 }}>
                <Box
                  onClick={() => setOpenCalendar((prev) => !prev)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: "#f6f7fb",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    height: "48px",
                  }}
                >
                  <Box
                    sx={{
                      width: "48px",
                      height: "100%",
                      backgroundColor: "#0F1B4C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarTodayIcon sx={{ color: "#fff", fontSize: 22 }} />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                      className="Secondary-color"
                    >
                      {`${format(dateRange[0].startDate, "dd MMM")} - ${format(
                        dateRange[0].endDate,
                        "dd MMM"
                      )}`}
                    </Typography>
                  </Box>
                </Box>
                {openCalendar && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      mt: 1,
                    }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item: any) => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                    />
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
            <input
              type="hidden"
              name="from"
              value={format(dateRange[0].startDate, "yyyy-MM-dd")}
            />
            <input
              type="hidden"
              name="to"
              value={format(dateRange[0].endDate, "yyyy-MM-dd")}
            />
            <Typography
              className="facilityCard-title"
              sx={{ textAlign: "center", marginBlock: "24px 15px" }}
            >
              You will pay{" "}
              <Typography className="facilityCard-span" component={"span"}>
                {" "}
                ${totalPrice} USD
              </Typography>{" "}
              per{" "}
              <Typography className="facilityCard-span" component={"span"}>
                {capacity} Person(s)
              </Typography>
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <ReusableButton
                type="submit"
                label={isCreating ? "Booking..." : "Continue Book"}
                padding="8px 85px"
                disabled={isCreating || isSubmitting}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default RoomBooking;
