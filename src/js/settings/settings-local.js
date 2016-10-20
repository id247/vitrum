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
	endQuizLink: 'https://wiki.dnevnik.ru/view.aspx?network=1000000386504&pageTitle=%u041a%u0430%u043a%u0438%u0435%20%u0432%u0438%u0442%u0430%u043c%u0438%u043d%u044b%20%u043d%u0443%u0436%u043d%u044b%20%u0448%u043a%u043e%u043b%u044c%u043d%u0438%u043a%u0443',
}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}
