import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import SimpleModal from "../../components/SimpleModal/SimpleModal";
import {
  createEvent,
  deleteEventById,
  fetchEventById,
  fetchEvents,
  updateEventById,
} from "../../services/request";
import SnackbarComponent from "../../components/Snackbar/SnackbarComponent";

const useStyles = makeStyles({
  userListContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  leftSide: {
    width: "13%",
    backgroundColor: "#f0f0f0",
  },
  rightSide: {
    flex: 1,
    marginLeft: "10px",
    backgroundColor: "#ffffff",
    padding: "10px",
  },
  title: {
    color: "#777777",
  },
  searchContainer: {
    width: "95%",
    marginBottom: "10px",
    "& .MuiTextField-root": {
      width: "500px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notFoundMessage: {
    textAlign: "center",
    marginTop: "20px",
    fontStyle: "italic",
  },
});

const EventsPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventList();
  }, []);

  const getEventList = async () => {
    fetchEvents()
      .then((response) => {
        if (response.success) {
          setEvents(response.events);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEventById = (id) => {
    fetchEventById(id)
      .then((response) => {
        const { event } = response;
        if (event) {
          setSelectedEvent(event);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddEvent = () => {
    const newEvent = {
      eventName: "",
      eventDate: "",
      eventLocation: "",
      eventDescription: "",
    };
    setSelectedEvent(newEvent);
    setOpen(true);
    setIsUpdate(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (event, isUpdate) => {
    setOpen(true);
    setIsUpdate(isUpdate);
    getEventById(event._id);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOnDelete = () => {
    deleteEventById(selectedEvent._id)
      .then((response) => {
        if (response.success) {
          getEventList();
          handleCloseModal();
          setIsSnackbarOpen(true);
          setSnackbarMessage("Event deleted successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEvent = () => {
    updateEventById(selectedEvent._id, selectedEvent)
      .then((response) => {
        if (response.success) {
          getEventList();
          handleCloseModal();
          setIsSnackbarOpen(true);
          setSnackbarMessage("Event updated successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addEvent = () => {
    createEvent(selectedEvent)
      .then((response) => {
        if (response.success) {
          getEventList();
          handleCloseModal();
          setIsSnackbarOpen(true);
          setSnackbarMessage("Event added successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnUpdate = () => {
    if (isUpdate) {
      updateEvent();
    } else {
      addEvent();
    }
  };

  const handleNameChange = (event) => {
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      eventName: event.target.value,
    }));
  };

  const handleDateChange = (event) => {
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      eventDate: event.target.value,
    }));
  };

  const handleLocationChange = (event) => {
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      eventLocation: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      eventDescription: event.target.value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <div className={classes.userListContainer}>
      <div className={classes.leftSide} />
      <div className={classes.rightSide}>
        <h1 className={classes.title}>Events</h1>
        <div className={classes.searchContainer}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="outlined"
            onClick={handleAddEvent}
            startIcon={<FiPlus />}
          >
            Add
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className={classes.notFoundMessage}>
                    No event found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>{event.eventDate}</TableCell>
                    <TableCell>{event.eventLocation}</TableCell>
                    <TableCell>{event.eventDescription}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleOpenModal(event, true);
                        }}
                        component={Link}
                      >
                        <Typography variant="body2">Edit</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <SimpleModal
          open={open}
          isUpdate={isUpdate}
          onClose={handleCloseModal}
          onDelete={handleOnDelete}
          onUpdate={handleOnUpdate}
        >
          {selectedEvent && (
            <>
              <TextField
                label="Name"
                value={selectedEvent.eventName}
                onChange={handleNameChange}
              />
              <TextField
                label="Date"
                type="date"
                value={selectedEvent.eventDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Location"
                value={selectedEvent.eventLocation}
                onChange={handleLocationChange}
              />
              <TextField
                label="Description"
                multiline
                rows={4}
                value={selectedEvent.eventDescription}
                onChange={handleDescriptionChange}
              />
            </>
          )}
        </SimpleModal>
        <SnackbarComponent
          isSnackbarOpen={isSnackbarOpen}
          snackbarMessage={snackbarMessage}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default EventsPage;
