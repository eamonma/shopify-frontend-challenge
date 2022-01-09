import React, { createContext } from "react"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

interface AppData {
    likedOnly: boolean
}

export type Action = {
    type: "SET_LIKED_ONLY"
    payload: boolean
}

type Dispatch = (action: Action) => void

const AppContext = createContext<
    | {
          state: AppData
          dispatch: Dispatch
      }
    | undefined
>(undefined)

type AppContextProviderProps = { children: React.ReactNode }

const AppContextReducer = (state: AppData, action: Action) => {
    let newContext: AppData = {
        likedOnly: false,
    }

    switch (action.type) {
        case "SET_LIKED_ONLY": {
            newContext = {
                likedOnly: action.payload,
            }
            break
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }

    if (typeof window !== "undefined") {
        localStorage.setItem("appContext", JSON.stringify(newContext))
    }

    return newContext
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    let lsAppContext: null | string = null

    const appContext = {
        likedOnly: false,
    }

    const [state, dispatch] = React.useReducer(AppContextReducer, appContext)

    const value = { state, dispatch }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    const context = React.useContext(AppContext)

    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        )
    }

    return context
}

export { AppContextProvider, useAppContext }
