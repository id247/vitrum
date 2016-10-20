export const OAuthOptions = {
	provider: 'vitrumMosreg',
	authUrl: 'https://login.school.mosreg.ru/oauth2',
	grantUrl: 'https://api.school.mosreg.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Files',	
	clientId: '5aafedb11c1c4505b0eaba3dcb819c62',
	redirectUrl: 'https://ad.school.mosreg.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.school.mosreg.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.school.mosreg.ru/promo/vitrum',
	server: 'https://school.mosreg.ru',
	endQuizLink: 'https://wiki.school.mosreg.ru/view.aspx?network=1000000601068&pageTitle=%u041a%u0430%u043a%u0438%u0435%20%u0432%u0438%u0442%u0430%u043c%u0438%u043d%u044b%20%u043d%u0443%u0436%u043d%u044b%20%u0448%u043a%u043e%u043b%u044c%u043d%u0438%u043a%u0443',

}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.school.mosreg.ru/images/avatars/user/a.m.jpg',
}
