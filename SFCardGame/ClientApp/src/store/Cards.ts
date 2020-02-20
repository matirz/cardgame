import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface CardsState {
    isLoading: boolean;
    startDateIndex?: number;
    cards: Card[];
}

export interface Card {
    name: string;
    value: number;
    imageUrl: string;
    description: string;
    type: string;
}

interface RequestCardsAction {
    type: 'REQUEST_CARDS';
    startDateIndex: number;
}

interface ReceiveCardsAction {
    type: 'RECEIVE_CARDS';
    startDateIndex: number;
    cards: Card[];
    card: Card;
}

type KnownAction = ReceiveCardsAction | RequestCardsAction;

export const actionCreators = {
    requestCards: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.cards && startDateIndex !== appState.cards.startDateIndex) {
            fetch('api/SFCardGame/Cards')
                .then(response => response.json() as Promise<Card[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_CARDS', startDateIndex: startDateIndex, cards: data, card: data[0] });
                });

            dispatch({ type: 'REQUEST_CARDS', startDateIndex: startDateIndex });
        }
    }
};

const unloadedState: CardsState = {
    cards: [], isLoading: false
};

export const reducer: Reducer<CardsState> = (state: CardsState | undefined, incomingAction: Action): CardsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {


        case 'REQUEST_CARDS':
            return {
                startDateIndex: action.startDateIndex,
                cards: state.cards,
                isLoading: true
            };
        case 'RECEIVE_CARDS':
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    cards: action.cards,
                    isLoading: false
                };
            }
            break;
    }
    return state;
};
