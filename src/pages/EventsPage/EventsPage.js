import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { RiArrowRightSLine, RiDeleteBinLine } from "react-icons/ri";
import { ROUTE_PATHS } from "../../App.routes";

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
    marginBottom: "10px",
    "& .MuiTextField-root": {
      width: "500px",
    },
  },
  notFoundMessage: {
    textAlign: "center",
    marginTop: "20px",
    fontStyle: "italic",
  },
});

const EventsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
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
  ];

  const deleteEvent = (eventId) => {
    console.log(`Deleting event with ID: ${eventId}`);
  };

  const handleEventClick = (eventId) => {
    navigate(ROUTE_PATHS.EVENT_DETAILS.replace(":id", eventId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className={classes.notFoundMessage}>
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
                      <Button onClick={() => deleteEvent(event.id)}>
                        <RiDeleteBinLine />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEventClick(event.id)}
                        component={Link}
                        to={ROUTE_PATHS.EVENT_DETAILS.replace(":id", event.id)}
                      >
                        <RiArrowRightSLine size={25} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default EventsPage;
