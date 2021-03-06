import { useState } from "react";
import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from "./todolists-reducer";

 export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

 export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string 
    todolistId: string
 }
 export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string 
    todolistId: string
 }
 export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean 
    todolistId: string
    id: string
 }
 export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string 
    todolistId: string
    id: string
 }

 export let initialState: TasksStateType  = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
 }

 export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let tasks = state[action.todolistId];
            let filteredTasks = tasks.filter((t) => t.id !== action.id);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            let stateCopy = {...state};
            let task = {id: v1(), title: action.title, isDone: false };
            let todolistsTasks = state[action.todolistId];
            stateCopy[action.todolistId] = [task, ...todolistsTasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state};
            let updatedTodolistsTasks = stateCopy[action.todolistId];
            let updatedTask = updatedTodolistsTasks.find((t) => t.id === action.id);
            if(updatedTask) {
                updatedTask.isDone = action.isDone;
            }
            stateCopy[action.todolistId] = [...updatedTodolistsTasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state};
            let updatedTodolistsTasks = stateCopy[action.todolistId];
            let updatedTask = updatedTodolistsTasks.find((t) => t.id === action.id);
            if(updatedTask) {
                updatedTask.title = action.title;
            }
            stateCopy[action.todolistId] = [...updatedTodolistsTasks];
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state};
            stateCopy[action.id] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            return state;
    }
 }

 export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', id: id, todolistId: todolistId}
 }
 export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title: title, todolistId: todolistId}
 }
 export const changeTaskStatusAC = (id: string, value: boolean, todolistId: string, ): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone: value, todolistId: todolistId, id: id}
 }
 export const changeTaskTitleAC = (id: string, title: string, todolistId: string, ): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title: title, todolistId: todolistId, id: id}
 }

