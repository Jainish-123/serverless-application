import React, { useEffect, useState } from "react";
import { fetchEvents, registerForEvent } from "../Services/eventService";
import { Event } from "../interfaces/Event";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents();
                setEvents(eventsData.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
            }
        };
        getEvents();
    }, []);

    const handleClickOpen = (eventId: string) => {
        setSelectedEventId(eventId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setEmail("");
        setPhone("");
    };

    const handleRegister = async () => {
        if (!name || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        if (selectedEventId) {
            try {
                const response = await registerForEvent(selectedEventId, name, email, phone);
                if (response) {
                    console.log("Registration successful");
                    toast.success("Event Registration successfull");
                    handleClose();
                }
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Event Registration failed");
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>
            <Grid container spacing={4}>
                {events.map((event) => (
                    <Grid item key={event.eventId} xs={12} sm={6} md={4}>
                        <Card>
                            {event.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={event.image}
                                    alt={event.title}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {event.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {event.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(event.date).toDateString()} {event.time}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleClickOpen(event.eventId)}
                                >
                                    Register
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Register for Event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To register for this event, please enter your details here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRegister} color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventList;
