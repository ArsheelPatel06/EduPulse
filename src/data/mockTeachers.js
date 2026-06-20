// src/data/mockTeachers.js

export const mockTeachers = [
    {
        id: 'T001', name: 'Dr. Anjali Mehta', email: 'anjali.mehta@edu.com',
        dept: 'Computer Science', subjects: ['Data Structures', 'Algorithms'],
        coursesCount: 3, studentsCount: 48, avatar: 'Anjali', status: 'active',
        joinedDate: '2021-07-15',
    },
    {
        id: 'T002', name: 'Prof. Sunil Rao', email: 'sunil.rao@edu.com',
        dept: 'Information Technology', subjects: ['Web Development', 'Database Systems'],
        coursesCount: 4, studentsCount: 62, avatar: 'Sunil', status: 'active',
        joinedDate: '2019-08-01',
    },
    {
        id: 'T003', name: 'Dr. Kavita Singh', email: 'kavita.singh@edu.com',
        dept: 'Computer Science', subjects: ['Operating Systems', 'Networks'],
        coursesCount: 2, studentsCount: 35, avatar: 'Kavita', status: 'active',
        joinedDate: '2020-01-10',
    },
    {
        id: 'T004', name: 'Prof. Ramesh Iyer', email: 'ramesh.iyer@edu.com',
        dept: 'Mathematics', subjects: ['Discrete Math', 'Linear Algebra'],
        coursesCount: 2, studentsCount: 55, avatar: 'Ramesh', status: 'active',
        joinedDate: '2018-06-20',
    },
    {
        id: 'T005', name: 'Dr. Preethi Nair', email: 'preethi.nair@edu.com',
        dept: 'Information Technology', subjects: ['Machine Learning', 'AI'],
        coursesCount: 2, studentsCount: 28, avatar: 'Preethi', status: 'on-leave',
        joinedDate: '2022-03-05',
    },
];

// Demo teacher for login
export const demoTeacher = {
    id: 'T001',
    name: 'Dr. Anjali Mehta',
    email: 'teacher@edupulse.com',
    role: 'teacher',
    dept: 'Computer Science',
    avatar: 'Anjali',
};
