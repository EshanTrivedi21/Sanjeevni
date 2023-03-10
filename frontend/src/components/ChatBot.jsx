import React, { useEffect } from "react";
import { Theme } from "./Theme";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Bharti from "../assets/bharti.png";
import apiPost from "../utilities/apiCall";

const UserMessage = (props) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  return (
    <>
      <div className="h-auto my-2 mr-2 flex justify-end items-end">
        <div className="h-auto w-[65%] my-2 rounded-lg py-2 px-4 bg-slate-200">
          {props.msg}
        </div>
      </div>
    </>
  );
};
const BotMessage = (props) => {
  return (
    <>
      <div className="h-auto my-2 flex justify-start items-end">
        <div className="h-7 w-7 my-2 mx-2">
          <img src={Bharti}></img>
        </div>
        <div className="h-auto w-[65%] my-2 rounded-lg py-2 px-4 bg-cyan-100 mr-2">
          {props.msg}
        </div>
      </div>
    </>
  );
};

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [msg, setMsg] = React.useState("");
  const [data, setData] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  function submit(e) {
    apiPost("chat/chatbot", { msg: msg }, setData);
    setMessages((oldArray) => [...oldArray, { msg: msg, type: "user" }]);
    setMsg("");
  }

  useEffect(() => {
    if (data) {
      if(data.out){
        setMessages((oldArray) => [...oldArray, { msg: data.out, type: "bot" }]);
      }
    }
  }, [data]);
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  return (
    <>
      <Theme>
        <div>
          <svg
            style={{
              marginTop: "1.25rem",
              marginRight: 20,
            }}
            className="w-7 absolute inset-0 mt-5 ml-5"
            fill="#0061af"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => window.history.back()}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <div className="absolute top-0 right-0 m-5">
            <FormControl
              sx={{
                width: "150px",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  fontSize: 16,
                }}
              >
                Lang
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Lang"
                defaultValue={"en"}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
                sx={{
                  borderRadius: "15px",

                  "& fieldset": {
                    height: "50px",
                    border: "2px solid gray",
                  },
                }}
              >
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"hi"}>Hindi</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-[90vw] h-[75vh] mt-[15vh] ml-auto mr-auto shadow-2xl bg-white rounded-3xl overflow-hidden flex flex-col justify-between border-2 border-[#004C77]">
            <div className="h-[20vh] bg-[#004C77]">
              <Typography
                variant="h4"
                component="h2"
                color="primary.contrastText"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  color: "#fff",
                  textAlign: "center",
                  pt: { mobile: 3, tablet: 5, laptop: 5 },
                  mb: 1,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {t("namaste")}
              </Typography>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#c5c5c5",
                  textAlign: "center",
                }}
              >
                {t("ask bharti")}
              </p>
            </div>
            <div className="flex flex-col justify-start h-full overflow-auto">
              <BotMessage msg={t("namaste bharti")} />
              {messages.map((message, index) => {
                if (message.type === "user") {
                  return <UserMessage msg={message.msg} key={index}/>;
                } else {
                  return <BotMessage msg={message.msg} key={index}/>;
                }
              })}
              <div ref={(el) => { el && el.scrollIntoView({ behavior: 'smooth' }) }}></div>
            </div>
            <div className="flex justify-center border-t-2 border-[#004C77] bg-[#004C77]">
              <TextField
                label={t("ask doubt")}
                variant="outlined"
                fullWidth
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                sx={{
                  mb: 4,
                  "& fieldset": {
                    borderColor: "#cfcfcf !important",
                    borderWidth: 2,
                    borderRadius: "15px !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    fontSize: 18,
                    color: "#cfcfcf !important",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 18,
                    color: "#cfcfcf !important",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: 18,
                    color: "#cfcfcf !important",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        aria-label="send"
                        onClick={(e) => submit(e)}
                      >
                        <SendIcon
                          style={{
                            color: "#cfcfcf",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </Theme>
    </>
  );
};

export default ChatBot;
