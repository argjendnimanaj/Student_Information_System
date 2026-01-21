import { defineStore } from "pinia";
import { ref } from 'vue'


export const useStudentsStore = defineStore("students", () => {
    const students = ref([
      { id: 1458, name: 'Mergim Bajrami', dob: '1989-10-05', municipality: 'Prishtine' },
      { id: 1459, name: 'Arta Krasniqi', dob: '1990-03-12', municipality: 'Prizren' },
      { id: 1460, name: 'Flamur Dervishi', dob: '1988-07-22', municipality: 'Gjilan' },
      { id: 1461, name: 'Liridona Ahmeti', dob: '1991-01-15', municipality: 'Ferizaj' },
      { id: 1462, name: 'Besnik Rexhepi', dob: '1987-11-30', municipality: 'Peja' },
      { id: 1463, name: 'Valentina Shala', dob: '1992-05-08', municipality: 'Mitrovica' },
      { id: 1464, name: 'Driton Kelmendi', dob: '1989-09-14', municipality: 'Gjakova' },
      { id: 1465, name: 'Elsa Berisha', dob: '1990-12-03', municipality: 'Vushtrri' },
      { id: 1466, name: 'Ilir Hasani', dob: '1988-04-19', municipality: 'Podujeva' },
      { id: 1467, name: 'Sara Musliu', dob: '1991-08-27', municipality: 'Lipjan' },
      { id: 1469, name: 'Fjolla Gashi', dob: '1990-02-28', municipality: 'Prizren' },
      { id: 1470, name: 'Gentian Leka', dob: '1988-10-17', municipality: 'Gjilan' },
      { id: 1471, name: 'Hana Ismajli', dob: '1991-04-09', municipality: 'Ferizaj' },
      { id: 1472, name: 'Kujtim Veliqi', dob: '1987-12-25', municipality: 'Peja' },
      { id: 1473, name: 'Linda Kelmendi', dob: '1992-07-04', municipality: 'Mitrovica' },
      { id: 1474, name: 'Mirsad Krasniqi', dob: '1989-11-21', municipality: 'Gjakova' },
      { id: 1475, name: 'Nora Ahmetaj', dob: '1990-08-16', municipality: 'Vushtrri' },
      { id: 1476, name: 'Orhan Dervishi', dob: '1988-03-30', municipality: 'Podujeva' },
      { id: 1477, name: 'Rina Shala', dob: '1991-09-13', municipality: 'Lipjan' },
      { id: 1478, name: 'Arben Thaçi', dob: '1989-06-11', municipality: 'Prishtine' },
    ])

    const archivedStudents = ref([
      {
        id: 1000,
        name: 'Alice Johnson',
        dob: '2005-03-15',
        municipality: 'New York',
        archivedAt: '2023-06-01',
      },
      {
        id: 1001,
        name: 'Bob Smith',
        dob: '2004-07-22',
        municipality: 'Los Angeles',
        archivedAt: '2022-12-15',
      },
      {
        id: 1002,
        name: 'Charlie Brown',
        dob: '2006-01-10',
        municipality: 'Chicago',
        archivedAt: '2024-02-20',
      },
      {
        id: 1003,
        name: 'Diana Prince',
        dob: '2005-09-05',
        municipality: 'Houston',
        archivedAt: '2023-08-10',
      },
      {
        id: 1004,
        name: 'Ethan Hunt',
        dob: '2004-11-30',
        municipality: 'Phoenix',
        archivedAt: '2022-10-05',
      },
      {
        id: 1005,
        name: 'Fiona Green',
        dob: '2006-04-18',
        municipality: 'Philadelphia',
        archivedAt: '2024-01-12',
      },
      {
        id: 1006,
        name: 'George Miller',
        dob: '2005-12-07',
        municipality: 'San Antonio',
        archivedAt: '2023-11-25',
      },
      {
        id: 1007,
        name: 'Hannah Lee',
        dob: '2004-05-14',
        municipality: 'San Diego',
        archivedAt: '2022-09-30',
      },
      {
        id: 1008,
        name: 'Ian Clark',
        dob: '2006-08-25',
        municipality: 'Dallas',
        archivedAt: '2024-03-18',
      },
      {
        id: 1009,
        name: 'Julia Roberts',
        dob: '2005-06-12',
        municipality: 'San Jose',
        archivedAt: '2023-07-22',
      },
    ])

  function addStudent(student) {
    students.value.push(student)
  }

  function editStudent(student) {
    const index = students.value.findIndex(s => s.id == student.id)
    if (index !== -1) {
      students.value[index] = student
    }
  }

  function deleteStudent(student) {
    const index = students.value.findIndex(s => s.id == student.id)
      if (index !== -1) {
        students.value.splice(index, 1)

        archivedStudents.value.push({
        ...student,
        archivedAt: new Date().toISOString().split('T')[0],
        })
    }
  }

  function restoreStudent(student) {
      students.value.push(student)

      const index = archivedStudents.value.findIndex((s) => s.id === student.id)
      archivedStudents.value.splice(index, 1)
    }

  return {
    students,
    archivedStudents,
    addStudent,
    editStudent,
    deleteStudent,
    restoreStudent
  }
},
{
  persist: {
    key: 'students-store',
    paths: ['students', 'archivedStudents'],
  },
})
