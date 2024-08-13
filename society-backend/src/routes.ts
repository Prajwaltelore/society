import { Router } from "express";
import { Welcome } from "./controller/pages.controller";
import { AuthenticatedUser, Login, Logout, Refresh, Register, Updateprofile, searchUsersByMobile } from "./controller/auth.controller";
import { Fetchcountries, Fetchstates, Fetchcities, FetchStatesByCountry, FetchCitiesByState } from "./controller/address.controller";
import { fetchSocieties, Add_society, UpdateSociety, DeleteSociety, fetchSocietiesByUser, fetchSociety, respondRequest, fetchSocietiesByName, fetchMembersBySociety, homeDataCount, fetchJoinedSociety, fetchMembersRequestsBySociety, removeMember } from "./controller/society.controller";
import { fetchDocuments, fetchDocsBySociety, Add_docs, UpdateDocument, DeleteDocument } from "./controller/documents.controller";
import { Add_categories, UpdateCategories, DeleteCategory, FetchCategories, FetchSubCategories} from "./controller/categories.controller";
import { Add_groups, UpdateGroups, DeleteGroups, FetchGroups, FetchSubGroups, fetchGroupsBySociety, fetchSubGroupsByGroup} from "./controller/groups.controller";
import { AddMembers, UpdateMembers, DeleteMembers, GetMembers, fetchRoles, RequestMembership, fetchMemberById} from "./controller/members.controller";
import { sendOtp,verifyOtp } from "./controller/messages.controller";

// Validation files
import { signupValidation, loginValidation, userUpdateValidation, createSocietyValidation, docValidation } from './services/validator';

export const routes = (router: Router) => {
    router.get('/', Welcome)
    router.post('/api/register', signupValidation, Register)
    router.post('/api/login', loginValidation, Login)
    router.get('/api/user', AuthenticatedUser)
    router.put('/api/user/:id', Updateprofile)
    router.post('/api/refresh', Refresh)
    router.get('/api/logout', Logout)
    router.get('/api/user/search/:id', searchUsersByMobile)

    router.post('/api/reset/otp', sendOtp)
    router.post('/api/verify/otp', verifyOtp)

    router.get('/api/countries', Fetchcountries)
    router.get('/api/states', Fetchstates)
    router.get('/api/cities', Fetchcities)
    router.get('/api/country/:id/states', FetchStatesByCountry)
    router.get('/api/state/:id/cities', FetchCitiesByState)
    
    router.get('/api/societies', fetchSocieties)
    router.get('/api/user/:id/societies', fetchSocietiesByUser)
    router.get('/api/user/:id/societies/joined', fetchJoinedSociety)
    router.get('/api/societies/:id',  fetchSociety)
    router.post('/api/societies/search', fetchSocietiesByName)
    router.post('/api/societies', createSocietyValidation, Add_society)
    router.put('/api/societies/:id', UpdateSociety)
    router.delete('/api/societies/:id', DeleteSociety)
    router.get('/api/societies/:id/members', fetchMembersBySociety)
    router.delete('/api/societies/:id/members/:id', removeMember)
    router.post('/api/societies/requests', fetchMembersRequestsBySociety)
    router.post('/api/societies/requests/response', respondRequest)
    router.get('/api/societies/:id/home', homeDataCount)

    router.get('/api/societies/:id/groups', fetchGroupsBySociety)
    router.get('/api/groups/:id/subgroups', fetchSubGroupsByGroup)

    router.get('/api/documents', fetchDocuments)
    router.get('/api/societies/{id}/documents', fetchDocsBySociety)
    router.post('/api/documents', docValidation, Add_docs)
    router.put('/api/documents/:id', UpdateDocument)
    router.delete('/api/documents/:id', DeleteDocument)
    
    router.post('/api/categories', Add_categories)
    router.put('/api/categories/:id', UpdateCategories)
    router.delete('/api/categories/:id', DeleteCategory)
    router.get('/api/categories', FetchCategories)
    router.get('/api/categories/:id/subcategories', FetchSubCategories)

    router.post('/api/groups', Add_groups)
    router.put('/api/groups/:id', UpdateGroups)
    router.delete('/api/groups/:id', DeleteGroups)
    router.get('/api/groups', FetchGroups)
    router.get('/api/groups/:id', FetchSubGroups)

    router.get('/api/roles', fetchRoles)
    router.post('/api/members', AddMembers)
    router.put('/api/members/:id', UpdateMembers)
    router.delete('/api/members/:id', DeleteMembers)
    router.get('/api/members/:id', fetchMemberById)
    router.get('/api/members', GetMembers)
    router.post('/api/members/request', RequestMembership)

}