import { defineDb, defineTable, column, NOW } from 'astro:db';

const User = defineTable({
  columns: {
    mail: column.text({ primaryKey: true }),
    sessionId: column.number({ references: () => Session.columns.id, optional: true }),
  }
})

const Session = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
    }
})

const Task = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        sessionId: column.number({ references: () => Session.columns.id }),
        name: column.text(),
        efford: column.number()
    }
})

const TaskLog = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        sessionId: column.number({ references: () => Session.columns.id }),
        TaskId: column.number({ references: () => Task.columns.id }),
        userMail: column.text({ references: () => User.columns.mail }),
        date: column.date({default: NOW})
    }
})

export default defineDb({
  tables: { User, Session, Task, TaskLog},
})