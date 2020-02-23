import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface GameState {
    playerOneCard: Card;
    playerTwoCard: Card;
    winnerLabel: String;
    GameEnded: boolean;
    gameType: string;
}

export interface Card {
    name: string;
    value: number;
    imageUrl: string;
    description: string;
    type: string;
}

interface ReceivePlayerOneRandomCardAction {
    type: 'RECEIVE_PLAYER_ONE_RANDOM_CARD';
    playerOneCard: Card;
}

interface ReceivePlayerTwoRandomCardAction {
    type: 'RECEIVE_PLAYER_TWO_RANDOM_CARD';
    playerTwoCard: Card;
}

interface Reset {
    type: 'RESET';   
}

type KnownAction = ReceivePlayerOneRandomCardAction | ReceivePlayerTwoRandomCardAction | Reset

export const actionCreators = {
    reset: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
            dispatch({ type: 'RESET' });
    },
    requestPlayerOneRandomCard: (type: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/SFCardGame/RandomCard/${type}`)
            .then(response => response.json() as Promise<Card>)
            .then(data => {
                dispatch({ type: 'RECEIVE_PLAYER_ONE_RANDOM_CARD', playerOneCard: data });
            });
    },
    requestPlayerTwoRandomCard: (type: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/SFCardGame/RandomCard/${type}`)
            .then(response => response.json() as Promise<Card>)
            .then(data => {
                dispatch({ type: 'RECEIVE_PLAYER_TWO_RANDOM_CARD', playerTwoCard: data });
            });
    }
};

const unloadedState: GameState = {
    gameType: "hero", GameEnded: false, winnerLabel:"", playerOneCard: { description: "", imageUrl: "", name: "", type: "", value: 0 }, playerTwoCard: { description: "", imageUrl: "", name: "", type: "", value: 0 }
};

export const reducer: Reducer<GameState> = (state: GameState | undefined, incomingAction: Action): GameState => {
    if (state === undefined) {
        return unloadedState;
    }
    var winnerLabel: String = "";
    var gameEnded: boolean = false;

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RESET':            
           return state = unloadedState;
        case 'RECEIVE_PLAYER_ONE_RANDOM_CARD':
            if (state.playerTwoCard.value != 0 && action.playerOneCard.value != 0) {
                if (state.playerTwoCard.value > action.playerOneCard.value) {
                    gameEnded = true;
                    winnerLabel = "Player two wins !"
                } else if (state.playerTwoCard.value < action.playerOneCard.value) {
                    gameEnded = true;
                    winnerLabel = "Player one wins !"
                } else {
                    gameEnded = true;
                    winnerLabel = "Player one wins !"
                }
            }

            return {
                ...state,                
                playerOneCard: action.playerOneCard,
                winnerLabel: winnerLabel,
                GameEnded: gameEnded
            };
        case 'RECEIVE_PLAYER_TWO_RANDOM_CARD':
            if (action.playerTwoCard.value != 0 && state.playerOneCard.value != 0) {
                if (action.playerTwoCard.value > state.playerOneCard.value) {
                    winnerLabel = "Player two wins !"
                    gameEnded = true;
                } else if (action.playerTwoCard.value < state.playerOneCard.value) {
                    gameEnded = true;
                    winnerLabel = "Player one wins !"
                } else {
                    gameEnded = true;
                    winnerLabel = "Draw !"
                }
            }

            return {
                ...state,
                playerTwoCard: action.playerTwoCard,               
                winnerLabel: winnerLabel,
                GameEnded: gameEnded
            };
            break;
    }
    return state;
};
