import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SCHOOLS = 'GET_SCHOOLS';
const ADD_SCHOOL = 'ADD_SCHOOL';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

//action creator
const _getStudents = students => {
  return {
    type: GET_STUDENTS,
    students,
  };
};
const _getSchools = schools => {
  return {
    type: GET_SCHOOLS,
    schools,
  };
};
const addStudent = student => {
  return {
    type: ADD_STUDENT,
    student,
  };
};
const addSchool = school => {
  return {
    type: ADD_SCHOOL,
    school,
  };
};
const _updateSchool = school => {
  return {
    type: UPDATE_SCHOOL,
    school,
  };
};
const _updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};

//initial state
const initialState = {
  schools: [],
  students: [],
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      return { ...state, schools: action.schools };
    case GET_STUDENTS:
      return { ...state, students: action.students };
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.student] };
    case ADD_SCHOOL:
      return { ...state, schools: [...state.schools, action.school] };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(s => {
          return s.id == action.student.id ? action.student : s;
        }),
      };
    case UPDATE_SCHOOL:
      return {
        ...state,
        schools: state.schools.map(
          s => (s.id == action.school.id ? action.school : s)
        ),
      };
    default:
      return state;
  }
};

//thunks
export const getSchools = () => {
  return dispatch => {
    return axios
      .get('/api/schools')
      .then(resp => dispatch(_getSchools(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const getStudents = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(resp => dispatch(_getStudents(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const createStudent = student => {
  return dispatch => {
    return axios
      .post('/students/create', student)
      .then(resp => dispatch(addStudent(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const createSchool = school => {
  return dispatch => {
    return axios
      .post('/schools/create', school)
      .then(resp => dispatch(addSchool(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const updateSchool = (school, id) => {
  return dispatch => {
    return axios
      .put(`/schools/${id}`, school)
      .then(resp => dispatch(_updateSchool(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const updateStudent = (student, id) => {
  return dispatch => {
    return axios
      .put(`/students/${id}`, student)
      .then(resp => dispatch(_updateStudent(resp.data)))
      .catch(console.error.bind(console));
  };
};

//store
export const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
