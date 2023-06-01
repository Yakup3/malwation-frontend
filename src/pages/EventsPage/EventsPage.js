import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Button,
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

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Event 1",
      date: "June 15, 2023",
      location: "New York City",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Event 2",
      date: "July 10, 2023",
      location: "San Francisco",
      description: "Nulla facilisi. Sed nec felis eu dolor viverra sodales.",
    },
  ]);

  const handleAddEvent = () => {};

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (event, isUpdate) => {
    setOpen(true);
    setIsUpdate(isUpdate);
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOnDelete = () => {
    setOpen(false);
  };

  const handleOnUpdate = () => {
    setOpen(false);
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
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.description}</TableCell>
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
              <TextField label="Name" defaultValue={selectedEvent.name} />
              <TextField label="Date" defaultValue={selectedEvent.date} />
              <TextField
                label="Location"
                defaultValue={selectedEvent.location}
              />
              <TextField
                label="Description"
                multiline
                rows={4}
                defaultValue={selectedEvent.description}
              />
            </>
          )}
        </SimpleModal>
      </div>
    </div>
  );
};

export default EventsPage;
