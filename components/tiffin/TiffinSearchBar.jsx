"use client";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import DatePickerSearch from "../search/DatePickerSearch";
import Stack from "@mui/material/Stack";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoaderSpinner from "../LoaderSpinner";
import Card from "@mui/material/Card";
import useGetLocationResults from "@/hooks/catering/useGetLocationResults";
import { useDispatch, useSelector } from "react-redux";
// import { setManualLocation, setPeople, setSelectedLocation } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from "next/navigation";
import DatePickerSearchTiffin from "../search/DatePickerSearchTiffin";
import { fetchtiffinSearchCards } from "@/app/features/tiffin/tiffinFilterSlice";
import {
  fetchAllTiffinVendorList,
  setLocBoolean,
  setManualLocation,
  setPeople,
  setSelectedLocation,
  setVendorListItem,
  setVendorSearch,
} from "@/app/features/user/globalNavSlice";
import useAllowLocation from "@/hooks/useAllowLocation";
import ClearIcon from "@mui/icons-material/Clear";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #d9822b",
    },
    "&:hover fieldset": {
      border: "2px solid #d9822b",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #d9822b",
    },
    "& input::placeholder": {
      fontWeight: "600",
      fontSize: "12px",
    },
  },
  "& input": {
    border: "none",
    fontSize: "15px",
    padding: "16.55px 0px",
  },
}));

const CssTextFieldRadius = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #d9822b",
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    },
    "&:hover fieldset": {
      border: "2px solid #d9822b",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #d9822b",
    },
    "& input::placeholder": {
      fontWeight: "600",
      fontSize: "12px",
    },
  },
  "& input": {
    border: "none",
    fontSize: "15px",
    padding: "16.6px 0px",
  },
}));

const TiffinSearchBar = () => {
  const {
    isPlacePredictionsLoading,
    placePredictions,
    getPlacePredictions,
    selectLocation,
  } = useGetLocationResults();
  const { accessToken } = useSelector((state) => state.user);
  const inputRef = useRef(null);
  const {
    locBoolean,
    locationValuesGlobal,
    isLoading,
    manualLocation,
    selectedLocation,
    tiffinVendorList,
    vendorListItem,
    vendorSearch,
  } = useSelector((state) => state.globalnavbar);
  // const { startDate, endDate } = useSelector((state) => state.cateringFilter);
  const [isAdornmentClicked, setIsAdornmentClicked] = useState(false);

  const dispatch = useDispatch();
  const people = useSelector((state) => state.globalnavbar.people);
  const [localPeople, setLocalPeople] = useState(people);
  const [vendorBoolen, setVendorBoolean] = useState(false);

  const containerRef = useRef(null);
  const locSearchRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (vendorSearch) {
        dispatch(fetchAllTiffinVendorList());
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [vendorSearch, vendorListItem, dispatch]);

  const handleVendorSearchChange = (e) => {
    dispatch(setVendorSearch(e.target.value));
    setVendorBoolean(true);
  };

  const vendorListItemTiffin = (item) => {
    dispatch(setVendorListItem(item?.id));
    dispatch(setVendorSearch(item?.catering_service_name));
    setVendorBoolean(false);
  };

  const router = useRouter();

  const { getCurrentLocation } = useAllowLocation();

  const handleClear = () => {
    dispatch(setSelectedLocation(null));
    dispatch(setManualLocation(""));
    inputRef.current.focus();
    dispatch(setLocBoolean(false));
  };

  const handleClearVendorList = () => {
    dispatch(setVendorSearch(""));
  };

  const handleClickOutside = (event) => {
    console.log("Location Search Ref:", locSearchRef.current);
    // Check if the click is outside of the location search container and the vendor list container
    if (
      locSearchRef.current &&
      !locSearchRef.current.contains(event.target) &&
      containerRef.current &&
      !containerRef.current.contains(event.target)
    ) {
      setVendorBoolean(false);
      // Hide location search suggestions
      dispatch(setLocBoolean(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (accessToken) {
      getCurrentLocation();
    }
    dispatch(setPeople(localPeople));
    dispatch(fetchtiffinSearchCards());
    router.push("/tiffin-search");
    // console.log("tttttttttttttttttttttttttttttttttttttttttttttttTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  };

  return (
    <>
      <form
        onSubmit={onHandleSubmit}
        autoComplete="off"
        style={{ width: "100%", margin: "0px", padding: "0px" }}
      >
        <Stack
          className="search-bg"
          direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
          justifyContent="space-between"
          spacing={0}
        >
          <div
            className="w-100 input-nav-box"
            style={{ flex: "0 0 35%", position: "relative" }}
            ref={locSearchRef}
          >
            <CssTextFieldRadius
              required={!vendorSearch}
              id="outlined-number"
              placeholder="Enter your location..."
              variant="outlined"
              className="mt-0 input-ellipse"
              inputRef={inputRef}
              style={{ width: "100%" }}
              onChange={(evt) => {
                dispatch(setSelectedLocation(null));
                dispatch(setManualLocation(evt.target.value));
                getPlacePredictions({ input: evt.target.value });
              }}
              value={manualLocation}
              loading={isPlacePredictionsLoading}
              InputLabelProps={{
                style: { color: "#777777", fontSize: "14px" },
              }}
              InputProps={{
                style: {
                  borderRadius: "0px",
                  backgroundColor: "#ffffff",
                  paddingRight: "0px",
                },
                startAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => setIsAdornmentClicked(true)}
                  >
                    <MyLocationIcon />
                  </InputAdornment>
                ),
                endAdornment: manualLocation && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                className: "input-ellipse",
              }}
            />
            {placePredictions?.length > 0 && locBoolean && (
              <Card className="px-3 py-2 location-result" ref={containerRef}>
                {isPlacePredictionsLoading ? (
                  <LoaderSpinner />
                ) : (
                  <>
                    <p className="ct-box-search-loc mb-1">Search Results</p>
                    {placePredictions?.map((item, index) => (
                      <h2
                        className="ct-box-search-results cursor-pointer"
                        key={index}
                        onClick={() => selectLocation(item)}
                      >
                        {item?.description}
                      </h2>
                    ))}
                  </>
                )}
              </Card>
            )}
          </div>
          <div className="w-100" style={{ flex: "0 0 27.5%" }}>
            <DatePickerSearchTiffin />
          </div>
          <div
            className="three w-100"
            style={{ flex: "0 0 27.5%", position: "relative" }}
            ref={containerRef}
          >
            <CssTextField
              // required
              value={vendorSearch}
              onChange={handleVendorSearchChange}
              id="outlined-number"
              placeholder="Search Tiffins..."
              variant="outlined"
              // label="How many people attending?"
              className="mt-0 font-primary"
              style={{ width: "100%" }}
              InputLabelProps={{
                style: { color: "#777777", fontSize: "14px" },
              }}
              InputProps={{
                style: {
                  borderRadius: "0px",
                  backgroundColor: "#ffffff",
                  paddingLeft: "10px",
                },
                endAdornment: vendorSearch && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearVendorList}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                className: "input-ellipse",
              }}
            />

            {vendorBoolen &&
              (tiffinVendorList?.vendors?.length > 0 ? (
                <div className="vendor-list">
                  {tiffinVendorList?.vendors?.slice(0, 5).map((item) => (
                    <p
                      className="vendor-list-items"
                      key={item.id}
                      onClick={() => vendorListItemTiffin(item)}
                    >
                      <span style={{ display: "block" }}>
                        {item.catering_service_name}
                      </span>
                      <span className="list-card-desc mt-2">
                        {item.area ? `${item.area},` : ""} {item.city}
                      </span>
                      <hr className="custom-hr-tiffin mt-2" />
                    </p>
                  ))}
                </div>
              ) : (
                <div className="vendor-list">
                  <p className="vendor-list-items">0 Caterings Found</p>
                </div>
              ))}
          </div>
          <div style={{ flex: "0 0 10%" }}>
            <Button
              // disabled={isLoading}
              type="submit"
              className="red-btn"
              variant="contained"
              sx={{
                boxShadow: "none",
                width: "100%",
                fontWeight: "600",
                marginTop: "-0.5px",
                padding: "15.5px",
                fontSize: "14px",
                backgroundColor: "#d9822b",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#d9822b",
                },
              }}
            >
              <SearchIcon style={{ marginRight: "5px", fontSize: "18px" }} />{" "}
              Search
            </Button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default TiffinSearchBar;
