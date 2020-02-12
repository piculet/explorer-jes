/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { atlasFetch } from '../utilities/urlUtils';
import { checkForValidationFailure } from './validation';

export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const REQUEST_USER_ID = 'REQUEST_USER_ID';
export const RECEIVE_USER_ID = 'RECEIVE_USER_ID';

export function setFilters(filters) {
    return {
        type: SET_FILTERS,
        filters,
    };
}

export function resetFilters() {
    return {
        type: RESET_FILTERS,
    };
}

function requestUserId() {
    return {
        type: REQUEST_USER_ID,
    };
}

function receiveUserId(userId) {
    return {
        type: RECEIVE_USER_ID,
        userId,
    };
}

export function initialiseOwnerFilter() {
    return dispatch => {
        dispatch(requestUserId());
        return atlasFetch('jobs/username', { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => { return response.json(); })
            .then(response => {
                if (response && response.username && response.username !== '') {
                    dispatch(receiveUserId(response.username));
                }
            });
    };
}
