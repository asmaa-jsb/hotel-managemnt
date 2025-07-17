/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
// @ts-expect-error
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Typography,
  IconButton,
  Container,
  ClickAwayListener,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import heroImg from "../../../assets/Images/HeroImg.png";
import { useNavigate } from "react-router-dom";
import ReusableButton from "../../../components/UserSharedModual/ReusableButton/ReusableButton";

const Hero = () => {
  const [capacity, setCapacity] = useState<number>(2);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleExplore = () => {
    const from = format(dateRange[0].startDate, "yyyy-MM-dd");
    const to = format(dateRange[0].endDate, "yyyy-MM-dd");
    navigate(`/search?from=${from}&to=${to}&capacity=${capacity}`);
  };

  return (
    <Container maxWidth="xl" sx={{ maxWidth: "1400px", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          mt: 10,
          gap: 6,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ maxWidth: 500, mb: 4 }}>
            <Typography
              variant="h3"
              className="Secondary-color"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Forget Busy Work, <br />
              Start Next Vacation
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>
          </Box>

          {/* Booking Card */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleExplore();
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              maxWidth: 450,
              position: "relative",
            }}
            className="Secondary-color"
          >
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Start Booking
            </Typography>

            {/* Date Picker */}
            <Typography variant="body2" mb={1}>
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
            <input type="hidden" name="capacity" value={capacity} />

            {/* Capacity */}
            <Typography variant="body2" fontWeight="bold" mt={2} mb={1}>
              Capacity
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f6f7fb",
                borderRadius: "12px",
                overflow: "hidden",
                height: "48px",
                mb: 3,
              }}
            >
              <IconButton
                onClick={() => setCapacity((prev) => Math.max(1, prev - 1))}
                sx={{
                  height: "100%",
                  width: "48px",
                  borderRadius: 0,
                  backgroundColor: "#F75555",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#e74c3c" },
                }}
              >
                <RemoveIcon />
              </IconButton>

              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                  {capacity} {capacity === 1 ? "person" : "persons"}
                </Typography>
              </Box>

              <IconButton
                onClick={() => setCapacity((prev) => prev + 1)}
                sx={{
                  height: "100%",
                  width: "48px",
                  borderRadius: 0,
                  backgroundColor: "#32C99F",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2cb98e" },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Box pt={4}>
              <ReusableButton label="Explore" to="/" padding="8px 85px" />
            </Box>
          </Box>
        </Box>

        {/* Right Image with background */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "100%",
              borderRadius: "28px",
              backgroundColor: "#fff",
              position: "absolute",
              top: 20,
              right: -5,
              zIndex: 0,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <Box
            component="img"
            src={heroImg}
            alt="Hero"
            sx={{
              width: "100%",
              maxWidth: 500,
              borderRadius: "32px",
              objectFit: "cover",
              position: "relative",
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
