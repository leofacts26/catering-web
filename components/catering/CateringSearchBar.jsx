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
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCateringSearchCards,
  // setManualLocation, setPeople, setSelectedLocation
} from "@/app/features/user/cateringFilterSlice";
import { useRouter } from "next/navigation";
// import useDebounce from '@/hooks/useDebounce';
import {
  fetchAllVendorList,
  setLocBoolean,
  setManualLocation,
  setPeople,
  setSelectedLocation,
  setVendorListItem,
  setVendorSearch,
  setLocationPlaceId,
  setVendorSearchKit,
} from "@/app/features/user/globalNavSlice";
import useAllowLocation from "@/hooks/useAllowLocation";
import ClearIcon from "@mui/icons-material/Clear";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #C33332",
    },
    "&:hover fieldset": {
      border: "2px solid #C33332",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #C33332",
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
      border: "2px solid #C33332",
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      [theme.breakpoints.down("768")]: {
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
      },
    },
    "&:hover fieldset": {
      border: "2px solid #C33332",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #C33332",
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

const CateringSearchBar = () => {
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
    manualLocation,
    selectedLocation,
    isLoading,
    vendorList,
    people,
    vendorSearch,
    vendorlistitem,
  } = useSelector((state) => state.globalnavbar);

  //   console.log(vendorlistitem, "vendorlistitem vendorlistitem");
  // console.log(locBoolean, "locBoolean");
  // console.log(selectedLocation, "selectedLocation");

  const [isAdornmentClicked, setIsAdornmentClicked] = useState(false);

  const dispatch = useDispatch();
  //   const people = useSelector((state) => state.globalnavbar.people);
  //   const [localPeople, setLocalPeople] = useState("");
  //   const [vendorSearch, setVendorSearch] = useState("");
  const [vendorBoolen, setVendorBoolean] = useState(false);
  const [searchSelectItem, setSearchSelectItem] = useState("");
  //   console.log(vendorSearch, "vendorSearch vendorSearch");

  const containerRef = useRef(null);
  const locSearchRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (vendorSearch) {
        dispatch(fetchAllVendorList());
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [vendorSearch, vendorlistitem, dispatch]);

  const handleVendorSearchChange = (e) => {
    dispatch(setVendorSearch(e.target.value));
    setVendorBoolean(true);
  };

  const vendorListItemCater = (item) => {
    dispatch(setVendorListItem(item?.id));
    dispatch(setVendorSearch(item?.catering_service_name));
    setVendorBoolean(false);

    // Set searchSelectItem for search after vendor search setting location
    dispatch(setManualLocation(item?.formatted_address || ""));
    setSearchSelectItem({
      description: item?.formatted_address || "",
      place_id: item?.place_id || "",
      terms: [
        { value: item.formatted_address || "" },
      ]
      // Add other fields if needed
    });
    dispatch(setLocBoolean(false));
  };

  // console.log(vendorBoolen, "vendorBoolen vendorBoolen vendorBoolen vendorBoolen");

  const router = useRouter();
  const { getCurrentLocation } = useAllowLocation();

  const handleClear = () => {
    // dispatch(setSelectedLocation(null));
    dispatch(setManualLocation(""));
    inputRef.current.focus();
    dispatch(setLocBoolean(false));
  };

  const handleClearVendorList = () => {
    dispatch(setVendorSearch(""));
    dispatch(setVendorListItem(""));
  };

  const handleClickOutside = (event) => {
    // console.log("Location Search Ref:", locSearchRef.current);
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
    // dispatch(setPeople(localPeople));
    selectLocation(searchSelectItem)
    dispatch(fetchCateringSearchCards());
    router.push("/catering-search");
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={onHandleSubmit}
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
                // dispatch(setSelectedLocation(null));
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
            {placePredictions.length > 0 && locBoolean && (
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
                        // onClick={() => selectLocation(item)}
                        onClick={() => {
                          setSearchSelectItem(item)
                          dispatch(setManualLocation(item.description))
                          dispatch(setLocationPlaceId(item?.place_id))
                          dispatch(setLocBoolean(false))
                        }}
                      >
                        <Stack direction="row" alignItems="center" className="cateringHover">
                          <AddLocationIcon style={{ fontSize: '15px', color: '57636c', marginRight: '4px' }} /> {item?.description}
                        </Stack>
                      </h2>
                    ))}
                  </>
                )}
              </Card>
            )}
          </div>
          <div className="w-100" style={{ flex: "0 0 27.5%" }}>
            <DatePickerSearch />
          </div>
          <div
            className="three w-100"
            style={{ flex: "0 0 27.5%", position: "relative" }}
            ref={containerRef}
          >
            <CssTextField
              value={vendorSearch}
              onChange={handleVendorSearchChange}
              id="outlined-number"
              placeholder="Search Caterers..."
              variant="outlined"
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
              (vendorList?.vendors?.length > 0 ? (
                <div className="vendor-list">
                  {vendorList?.vendors?.slice(0, 5).map((item) => (
                    <p
                      className="vendor-list-items"
                      key={item.id}
                      onClick={() => vendorListItemCater(item)}
                    >
                      <span style={{ display: "block" }}>
                        {item.catering_service_name}
                      </span>
                      <span className="list-card-desc mt-2">
                        {item.area ? `${item.area},` : ""} {item.city}
                      </span>
                      <hr className="custom-hr mt-2" />
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
              //   disabled={isLoading}
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
                backgroundColor: "#C33332",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#C33332",
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

export default CateringSearchBar;
