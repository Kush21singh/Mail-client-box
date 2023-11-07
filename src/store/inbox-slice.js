import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    addEmails(state, action) {
      state.inboxMails = [action.payload];
      console.log("state", state.inboxMails);
    },
  },
});

export const inboxFill = (email) => {
  return async (dispatch) => {
    try {
      const userEmail = email.replace("@", "").replace(".", "");
      const resInbox = await fetch(
        `https://mail-box-65f0e-default-rtdb.firebaseio.com/${userEmail}/inbox.json`
      );
      const data = await resInbox.json();
      if (resInbox.ok && data !== null) {
        console.log(data);
        dispatch(inboxActions.addEmails(Object.entries(data)));
      } else if (!resInbox.ok) {
        throw Error("Failed to fetch inbox");
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const inboxActions = inboxSlice.actions;
export default inboxSlice;
