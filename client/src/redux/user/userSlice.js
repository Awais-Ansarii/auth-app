import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,

  loginErr: "",
  signinErr: "",
  signMsg: null,
  loginMsg: null,
  isLogin: false,
};

//  const [formData, setFormData] = useState({});
//  const [isError, setIsError] = useState(false);
//  const [msg, setmsg] = useState("");
// const [loading, setLoading] = useState(false);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.signMsg = action.payload.message;
      state.loading = false;
      state.isError = false;
      state.signinErr = "";
    },
    logInSuccess: (state, action) => {
      // console.log("payload-redux  ", action.payload);
      state.currentUser = action.payload;

      state.loading = false;
      state.isError = false;
      state.loginMsg = action.payload.message;
      state.loginErr = "";

      state.isLogin = true;
    },
    signInFail: (state, action) => {
      state.loading = false;

      state.signinErr = action.payload.message;
    },
    logInFail: (state, action) => {
      state.loading = false;

      state.loginErr = action.payload.message;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  logInSuccess,
  signInFail,
  logInFail,
} = userSlice.actions;

export default userSlice.reducer;
