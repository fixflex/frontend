import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import baseURL from "../../API/baseURL";
import { AttachMoney, CreditCard } from "@mui/icons-material";

const Payment = () => {
  const [offerId, setOfferId] = useState("");
  const [taskerId, setTaskerId] = useState("");
  const [taskId, setTaskId] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (
      !searchParams.get("offer") ||
      !searchParams.get("tasker") ||
      !searchParams.get("task")
    ) {
      navigate(-1);
    }
    setOfferId(searchParams.get("offer"));
    setTaskerId(searchParams.get("tasker"));
    setTaskId(searchParams.get("task"));
  }, [location.search, navigate]);

  const handleSubmit = async (type) => {
    if (!user?.phoneNumber) return;

    try {
      await baseURL.patch(`/offers/${offerId}/accept`);
      if (type === "card") {
        const response = await baseURL.patch(`/tasks/checkout/${taskId}`, {
          phoneNumber: user.phoneNumber,
          paymentMethod: "card",
        });
        await baseURL.post(`/chats`, { tasker: taskerId });
        window.location = response?.data?.data;
        return;
      }
      const response = await baseURL.post(`/chats`, { tasker: taskerId });
      if (response?.data?.data) {
        window.location = "https://www.fixflex.tech/chat";
      }
    } catch (error) {
      console.error("Error Message:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
      padding={15}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "1.5rem" }}
      >
        How would you like to pay for this task?
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Card
            sx={{
              width: 150,
              height: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgb(0 0 0 / 10%)",
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleSubmit("cash")}
          >
            <AttachMoney sx={{ fontSize: 40, color: "#000" }} />
            <Typography variant="h6" mt={2}>
              Cash
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              width: 150,
              height: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgb(0 0 0 / 10%)",
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleSubmit("card")}
          >
            <CreditCard sx={{ fontSize: 40, color: "#000" }} />
            <Typography variant="h6" mt={2}>
              Card
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
