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
              <table class="table">
              {students
              .filter(s=>s.schoolId==id)
              .map(s =>
                <tr class="d-flex">
                  <td key={s.id} class="col-6">{`${s.firstName} ${s.lastName}`}</td>
                  <td class="col-6 float-left">
                  <button
                  onClick={()=>this.handleUpdate(s)}
                  class="btn-danger btn-xs float-left"
                  >
                  x
                  </button>
                  </td>
                  </tr>
                )}
              </table>
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
