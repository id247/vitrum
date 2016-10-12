export const OAuthOptions = {
	provider: 'vitrumDnevnik',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Files',	
	clientId: 'fa9ac37c81074b5398f1ba061c1c367a',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnevnik.ru/promo/vitrum',
	server: 'https://dnevnik.ru',
}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}
