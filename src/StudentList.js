import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from './store'

class StudentList extends Component {

    constructor() {
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate = student => {
        const unaffiliatedStudent = student
        student.schoolId = null;
        this.props.updateStudent(unaffiliatedStudent, student.id)
    }

    render() {
        const { id, students } = this.props
        return (
            <div>
            <h4>Student List</h4>
              <ul>
              {students
              .filter(s=>s.schoolId==id)
              .map(s =>
                  <li key={s.id}>{`${s.firstName} ${s.lastName}`}
                  <div onClick={()=>this.handleUpdate(s)}>X</div>
                  </li>
                )}
              </ul>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        students: state.students
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStudent: (student, id) => dispatch(updateStudent(student, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
