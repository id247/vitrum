export const OAuthOptions = {
	provider: 'app',
	authUrl: 'https://login.staging.dnevnik.ru/oauth2',
	grantUrl: 'https://api.staging.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
	clientId: '5123975fe9eb415390fb7aa316a15e4e',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.staging.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'http://localhost:9000/vitrum.html',
	server: 'https://staging.dnevnik.ru',
}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}
