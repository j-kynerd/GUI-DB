import { AccountList } from "../data/AccountList";

export var currentUser = undefined;
export var filters = [];
export function addFilter(x){
    filters.push(x);
}
export function removeFilter(x){
    const index = filters.indexOf(x);
    if (index > -1) {
        filters.splice(index, 1)
    }
}
export function clearFilter(){
    filters.splice(0, filters.length)
}
export function setCurrentUser(setUser){
    currentUser = AccountList.find(x=> x.accountId == setUser);
}
export var filterOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
'Public Transportation', 'Families', 'Low Crime'];

export var searchQuery = "";
export function setSearchQuery(x){
    searchQuery = x;
}
export function clearSearchQuery(){
    searchQuery = '';
}