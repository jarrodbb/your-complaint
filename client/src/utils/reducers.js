import {
  ADD_COMPLAINT,
  ADD_COMMENT,
  UPDATE_COMPLAINT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
  REMOVE_COMPLAINT,
  UPDATE_ACCOUNT_STATUS,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
  case ADD_COMPLAINT:
    return {
      ...state,
      complaints: [...action.complaints],
    };

  case ADD_COMMENT:
    return {
      ...state,
      comments: [...action.comments],
    };

  case UPDATE_COMPLAINT: {
    const complaintIndex = state.complaints.findIndex(
      (complaint) => complaint.id === action.payload.id
    );

    const updateComplaint = {
      ...state.complaints[complaintIndex],
      ...action.payload,
    };

    const newComplaintsList = [...state.complaints];

    newComplaintsList[complaintIndex] = updateComplaint;
    return {
      ...state,
      complaints: newComplaintsList,
    };
  }

  case UPDATE_COMMENT: {
    const commentIndex = state.commentss.findIndex(
      (comment) => comment.id === action.payload.id
    );

    const updateComment = {
      ...state.comments[commentIndex],
      ...action.payload,
    };

    const newCommentList = [...state.comments];

    newCommentList[commentIndex] = updateComment;
    return {
      ...state,
      comments: newCommentList,
    };
  }

  case REMOVE_COMMENT: {
    return {
      ...state,
      comments: [...state.comments].filter(
        (comment) => comment.id !== action.payload
      ),
    };
  }

  case REMOVE_COMPLAINT: {
    return {
      ...state,
      complaints: [...state.complaints].filter(
        (complaint) => complaint.id !== action.payload
      ),
    };
  }

  case UPDATE_ACCOUNT_STATUS:
    console.log("UPDATE_ACCOUNT_STATUS dispatched");
    return {
      ...state,
      isLoggedIn: !state.isLoggedIn,
    };

  default:
    return state;
  }
};
