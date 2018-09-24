import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SCHOOLS = 'GET_SCHOOLS';
const ADD_STUDENT = 'ADD_STUDENT';
const ADD_SCHOOL = 'ADD_SCHOOL';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_SCHOOL = 'DELETE_SCHOOL'

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
const _addStudent = student => {
  return {
    type: ADD_STUDENT,
    student,
  };
};
const _addSchool = school => {
  return {
    type: ADD_SCHOOL,
    school,
  };
};
const _updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};
const _updateSchool = school => {
  return {
    type: UPDATE_SCHOOL,
    school,
  };
};
const _deleteStudent = id => {
  return {
    type: DELETE_STUDENT,
    id,
  }
}
const _deleteSchool = id => {
  return {
    type: DELETE_SCHOOL,
    id,
  }
}


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
  case DELETE_STUDENT:
    const student = state.students.find(s => s.id == action.id)
    return { ...state,
      students: state.students.filter(s => s != student)
    }
  case DELETE_SCHOOL:
    const school = state.schools.find(s => s.id == action.id)
    const newStudents = state.students.map(function (student) {
      if (student.schoolId != school.id) { student.schoolId = null }
      return student
    })
    return {
      ...state,
      schools: state.schools.filter(s => s != school),
      students: newStudents,
    }
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

export const addStudent = student => {
  return dispatch => {
    return axios
      .post('/students/create', student)
      .then(resp => dispatch(_addStudent(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const addSchool = school => {
  return dispatch => {
    return axios
      .post('/schools/create', school)
      .then(resp => dispatch(_addSchool(resp.data)))
      .catch(console.error.bind(console));
  };
};

export const deleteSchool = (id) => {
  return dispatch => {
    return axios
      .delete(`/schools/${id}`)
      .then(() => dispatch(_deleteSchool(id)))
      .catch(console.error.bind(console))
  }
}

export const deleteStudent = id => {
  return dispatch => {
    return axios
      .delete(`/students/${id}`)
      .then(() => dispatch(_deleteStudent(id)))
      .catch(console.error.bind(console))
  }
}

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
