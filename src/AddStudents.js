import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from './store'

class AddStudents extends Component {

    constructor() {
        super()
        this.state = {
            studentId: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleChange(e) {
        this.setState({
            studentId: e.target.value * 1
        })
    }

    handleUpdate() {
        const { id, history } = this.props
        const student = this.props.students.find(s => s.id == this.state.studentId)
        student.schoolId = id
        this.props
            .updateStudent(student, student.id * 1)
            .then(() => history.push(`/schools/${id}`))
    }

    render() {
        const { students } = this.props
        return (
            <div>
            <h4>Add Students</h4>
              <select
                onChange={this.handleChange}
                value = {this.state.studentId}
              >
              <option value=''>Select Student</option>
              {students
                .filter(s=>s.schoolId==null)
                .map(s=>{
                    return(
                    <option key={s.id} value={s.id}>
                    {`${s.firstName} ${s.lastName}`}
                    </option>
                    )
                })
              }
              </select>
              <button onClick={this.handleUpdate} disabled={!this.state.studentId}>+</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStudents)
