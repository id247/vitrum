export const OAuthOptions = {
	provider: 'vitrumschool.mosreg',
	authUrl: 'https://login.school.mosreg.ru/oauth2',
	grantUrl: 'https://api.school.mosreg.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Files',	
	clientId: 'fa9ac37c81074b5398f1ba061c1c367a',
	redirectUrl: 'https://ad.school.mosreg.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.school.mosreg.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.school.mosreg.ru/promo/vitrum',
	server: 'https://school.mosreg.ru',
}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.school.mosreg.ru/images/avatars/user/a.m.jpg',
}
