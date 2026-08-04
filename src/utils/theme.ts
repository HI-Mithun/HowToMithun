export function getInitialTheme(): 'dark' | 'light' {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
		return localStorage.getItem('theme') as 'dark' | 'light';
	}
	return 'dark'; // dark mode first, per project spec
}