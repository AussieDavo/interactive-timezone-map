// Interactive Timezone Map - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const appHeader = document.querySelector('.app-header');
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuClose = document.getElementById('menu-close');
    const overlay = document.getElementById('overlay');
    const copyAllPinsButton = document.getElementById('copy-all-pins');
    const clearPinsButton = document.getElementById('clear-pins');
    const pinList = document.getElementById('pin-list');
    const selectedCountryName = document.getElementById('selected-country-name');
    const selectedCountryMeta = document.getElementById('selected-country-meta');
    const selectedCountryPill = document.getElementById('selected-country-pill');
    const browserTime = document.getElementById('browser-time');
    const browserTimezone = document.getElementById('browser-timezone');
    const clockToggleButton = document.getElementById('clock-toggle');
    const sliderDatetime = document.getElementById('slider-datetime');
    const sliderDaySegments = document.getElementById('slider-day-segments');
    const sliderLiveChip = document.getElementById('slider-live-chip');
    const sliderLiveTime = document.getElementById('slider-live-time');
    const sliderLiveDate = document.getElementById('slider-live-date');
    const timelinePanLeftButton = document.getElementById('timeline-pan-left');
    const timelinePanRightButton = document.getElementById('timeline-pan-right');
    const chipEditToggleButton = document.getElementById('chip-edit-toggle');
    const chipEditPanel = document.getElementById('chip-datetime-popup');
    const chipDatetimeMonthLabel = document.getElementById('chip-datetime-month-label');
    const chipDatetimeDayGrid = document.getElementById('chip-datetime-day-grid');
    const chipDatetimePrevButton = document.getElementById('chip-datetime-prev');
    const chipDatetimeNextButton = document.getElementById('chip-datetime-next');
    const chipDatetimeHourInput = document.getElementById('chip-datetime-hour');
    const chipDatetimeMinuteInput = document.getElementById('chip-datetime-minute');
    const chipDatetimeSecondInput = document.getElementById('chip-datetime-second');
    const chipDatetimeApplyButton = document.getElementById('chip-datetime-apply');
    const chipDatetimeClearButton = document.getElementById('chip-datetime-clear');
    const chipTimezoneInput = document.getElementById('chip-timezone-input');
    const chipTimezoneDropdown = document.getElementById('chip-timezone-dropdown');
    const chipTimezoneList = document.getElementById('chip-timezone-list');
    const chipTimezoneDisplay = document.getElementById('chip-timezone-display');
    const chipCopyToggleButton = document.getElementById('chip-copy-toggle');
    const chipCopyMenu = document.getElementById('chip-copy-menu');
    const chipCopyLocalButton = document.getElementById('chip-copy-local');
    const chipCopyUtcButton = document.getElementById('chip-copy-utc');
    const chipPinToggleButton = document.getElementById('chip-pin-toggle');
    const topbarHideButton = document.getElementById('topbar-hide');
    const topbarShowButton = document.getElementById('topbar-show');
    const mapContainer = document.getElementById('map-container');
    const mapWrapper = document.getElementById('map-wrapper');
    const mapZoomOutButton = document.getElementById('map-zoom-out');
    const mapZoomInButton = document.getElementById('map-zoom-in');
    const mapZoomResetButton = document.getElementById('map-zoom-reset');
    const mapZoomValue = document.getElementById('map-zoom-value');
    const mapTiles = Array.from(document.querySelectorAll('.map-tile'));
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeDropdown = document.getElementById('theme-dropdown');
    const pins = [];
    let svgMarkup = '';
    let currentTheme = 'classic';
    const countryCodeToName = new Map();
    const countryCodeFallback = new Map([
        ['us', 'United States'],
        ['ca', 'Canada'],
        ['mx', 'Mexico'],
        ['br', 'Brazil'],
        ['au', 'Australia'],
        ['gb', 'United Kingdom'],
        ['de', 'Germany'],
        ['fr', 'France'],
        ['it', 'Italy'],
        ['es', 'Spain'],
        ['ru', 'Russia'],
        ['cn', 'China'],
        ['in', 'India'],
        ['jp', 'Japan'],
        ['za', 'South Africa'],
        ['nz', 'New Zealand'],
        ['ar', 'Argentina'],
        ['cl', 'Chile'],
        ['id', 'Indonesia'],
        ['ph', 'Philippines'],
        ['cr', 'Costa Rica'],
        ['pa', 'Panama'],
        ['gt', 'Guatemala'],
        ['hn', 'Honduras'],
        ['ni', 'Nicaragua'],
        ['bz', 'Belize'],
        ['sv', 'El Salvador'],
        ['do', 'Dominican Republic'],
        ['jm', 'Jamaica'],
        ['cu', 'Cuba'],
        ['co', 'Colombia'],
        ['ve', 'Venezuela'],
        ['ec', 'Ecuador'],
        ['pe', 'Peru'],
        ['bo', 'Bolivia'],
        ['py', 'Paraguay'],
        ['uy', 'Uruguay'],
        ['fi', 'Finland'],
        ['se', 'Sweden'],
        ['no', 'Norway'],
        ['dk', 'Denmark'],
        ['pl', 'Poland'],
        ['nl', 'Netherlands'],
        ['be', 'Belgium'],
        ['pt', 'Portugal'],
        ['ie', 'Ireland'],
        ['ch', 'Switzerland'],
        ['at', 'Austria'],
        ['cz', 'Czech Republic'],
        ['sk', 'Slovakia'],
        ['hu', 'Hungary'],
        ['ro', 'Romania'],
        ['bg', 'Bulgaria'],
        ['gr', 'Greece'],
        ['ua', 'Ukraine'],
        ['by', 'Belarus'],
        ['lt', 'Lithuania'],
        ['lv', 'Latvia'],
        ['ee', 'Estonia'],
        ['md', 'Moldova'],
        ['rs', 'Serbia'],
        ['hr', 'Croatia'],
        ['si', 'Slovenia'],
        ['ba', 'Bosnia and Herzegovina'],
        ['me', 'Montenegro'],
        ['al', 'Albania'],
        ['mk', 'North Macedonia'],
        ['tr', 'Turkey'],
        ['ge', 'Georgia'],
        ['az', 'Azerbaijan'],
        ['am', 'Armenia'],
        ['kz', 'Kazakhstan'],
        ['tm', 'Turkmenistan'],
        ['uz', 'Uzbekistan'],
        ['kg', 'Kyrgyzstan'],
        ['tj', 'Tajikistan'],
        ['af', 'Afghanistan'],
        ['pk', 'Pakistan'],
        ['bd', 'Bangladesh'],
        ['mm', 'Myanmar'],
        ['th', 'Thailand'],
        ['vn', 'Vietnam'],
        ['la', 'Laos'],
        ['kh', 'Cambodia'],
        ['my', 'Malaysia'],
        ['sg', 'Singapore'],
        ['kr', 'South Korea'],
        ['kp', 'North Korea'],
        ['tw', 'Taiwan'],
        ['mo', 'Macau'],
        ['hk', 'Hong Kong'],
        ['mn', 'Mongolia'],
        ['sa', 'Saudi Arabia'],
        ['ae', 'United Arab Emirates'],
        ['qa', 'Qatar'],
        ['kw', 'Kuwait'],
        ['om', 'Oman'],
        ['ye', 'Yemen'],
        ['iq', 'Iraq'],
        ['ir', 'Iran'],
        ['sy', 'Syria'],
        ['jo', 'Jordan'],
        ['lb', 'Lebanon'],
        ['il', 'Israel'],
        ['ps', 'Palestine'],
        ['eg', 'Egypt'],
        ['ly', 'Libya'],
        ['tn', 'Tunisia'],
        ['dz', 'Algeria'],
        ['ma', 'Morocco'],
        ['eh', 'Western Sahara'],
        ['sd', 'Sudan'],
        ['ss', 'South Sudan'],
        ['et', 'Ethiopia'],
        ['er', 'Eritrea'],
        ['dj', 'Djibouti'],
        ['so', 'Somalia'],
        ['ke', 'Kenya'],
        ['ug', 'Uganda'],
        ['tz', 'Tanzania'],
        ['rw', 'Rwanda'],
        ['bi', 'Burundi'],
        ['mw', 'Malawi'],
        ['zm', 'Zambia'],
        ['zm', 'Zambia'],
        ['zw', 'Zimbabwe'],
        ['mz', 'Mozambique'],
        ['ao', 'Angola'],
        ['na', 'Namibia'],
        ['bw', 'Botswana'],
        ['sz', 'Eswatini'],
        ['ls', 'Lesotho'],
        ['mg', 'Madagascar'],
        ['cm', 'Cameroon'],
        ['ga', 'Gabon'],
        ['cg', 'Congo'],
        ['cd', 'Democratic Republic of the Congo'],
        ['gq', 'Equatorial Guinea'],
        ['cf', 'Central African Republic'],
        ['td', 'Chad'],
        ['ne', 'Niger'],
        ['ng', 'Nigeria'],
        ['bj', 'Benin'],
        ['tg', 'Togo'],
        ['gh', 'Ghana'],
        ['ci', 'Ivory Coast'],
        ['bf', 'Burkina Faso'],
        ['sl', 'Sierra Leone'],
        ['lr', 'Liberia'],
        ['gw', 'Guinea-Bissau'],
        ['gn', 'Guinea'],
        ['gm', 'Gambia'],
        ['sn', 'Senegal'],
        ['mr', 'Mauritania'],
        ['ml', 'Mali'],
        ['ma', 'Morocco'],
        ['pt', 'Portugal'],
        ['es', 'Spain'],
        ['fo', 'Faroe Islands'],
        ['is', 'Iceland'],
        ['gl', 'Greenland'],
        ['dk', 'Denmark'],
        ['ie', 'Ireland'],
        ['gb', 'United Kingdom'],
        ['mc', 'Monaco'],
        ['ad', 'Andorra'],
        ['sm', 'San Marino'],
        ['va', 'Vatican City'],
        ['li', 'Liechtenstein'],
        ['mt', 'Malta'],
        ['cy', 'Cyprus'],
        ['ba', 'Bosnia and Herzegovina'],
        ['xk', 'Kosovo'],
        ['rs', 'Serbia'],
        ['me', 'Montenegro'],
        ['al', 'Albania'],
        ['mk', 'North Macedonia'],
        ['ua', 'Ukraine'],
        ['by', 'Belarus'],
        ['md', 'Moldova'],
        ['ge', 'Georgia'],
        ['am', 'Armenia'],
        ['az', 'Azerbaijan'],
        ['tr', 'Turkey'],
        ['sy', 'Syria'],
        ['lb', 'Lebanon'],
        ['jo', 'Jordan'],
        ['il', 'Israel'],
        ['ps', 'Palestine'],
        ['eg', 'Egypt'],
        ['ly', 'Libya'],
        ['tn', 'Tunisia'],
        ['dz', 'Algeria'],
        ['ma', 'Morocco'],
        ['eh', 'Western Sahara'],
        ['sd', 'Sudan'],
        ['ss', 'South Sudan'],
        ['et', 'Ethiopia'],
        ['er', 'Eritrea'],
        ['dj', 'Djibouti'],
        ['so', 'Somalia'],
        ['ke', 'Kenya'],
        ['ug', 'Uganda'],
        ['tz', 'Tanzania'],
        ['rw', 'Rwanda'],
        ['bi', 'Burundi'],
        ['mw', 'Malawi'],
        ['zm', 'Zambia'],
        ['zw', 'Zimbabwe'],
        ['mz', 'Mozambique'],
        ['ao', 'Angola'],
        ['na', 'Namibia'],
        ['bw', 'Botswana'],
        ['sz', 'Eswatini'],
        ['ls', 'Lesotho'],
        ['mg', 'Madagascar'],
        ['km', 'Comoros'],
        ['sc', 'Seychelles'],
        ['mu', 'Mauritius'],
        ['re', 'Réunion'],
        ['yt', 'Mayotte'],
        ['st', 'Sao Tome and Principe'],
        ['cv', 'Cape Verde'],
        ['sh', 'Saint Helena'],
        ['tf', 'French Southern Territories'],
        ['pm', 'Saint Pierre and Miquelon'],
        ['bl', 'Saint Barthélemy'],
        ['mf', 'Saint Martin'],
        ['gp', 'Guadeloupe'],
        ['mq', 'Martinique'],
        ['gf', 'French Guiana'],
        ['sr', 'Suriname'],
        ['gy', 'Guyana'],
        ['tt', 'Trinidad and Tobago'],
        ['bb', 'Barbados'],
        ['lc', 'Saint Lucia'],
        ['vc', 'Saint Vincent and the Grenadines'],
        ['gd', 'Grenada'],
        ['ag', 'Antigua and Barbuda'],
        ['dm', 'Dominica'],
        ['kn', 'Saint Kitts and Nevis'],
        ['bs', 'Bahamas'],
        ['ht', 'Haiti'],
        ['pr', 'Puerto Rico'],
        ['vi', 'U.S. Virgin Islands'],
        ['vg', 'British Virgin Islands'],
        ['ai', 'Anguilla'],
        ['ms', 'Montserrat'],
        ['tc', 'Turks and Caicos Islands'],
        ['ky', 'Cayman Islands'],
        ['bm', 'Bermuda'],
        ['gl', 'Greenland'],
        ['fo', 'Faroe Islands'],
        ['is', 'Iceland'],
        ['sj', 'Svalbard and Jan Mayen'],
        ['aq', 'Antarctica'],
        ['bv', 'Bouvet Island'],
        ['hm', 'Heard Island and McDonald Islands'],
        ['tf', 'French Southern Territories'],
        ['cx', 'Christmas Island'],
        ['cc', 'Cocos (Keeling) Islands'],
        ['nf', 'Norfolk Island'],
        ['nu', 'Niue'],
        ['tk', 'Tokelau'],
        ['wf', 'Wallis and Futuna'],
        ['pf', 'French Polynesia'],
        ['nc', 'New Caledonia'],
        ['vu', 'Vanuatu'],
        ['sb', 'Solomon Islands'],
        ['fm', 'Micronesia'],
        ['mh', 'Marshall Islands'],
        ['pw', 'Palau'],
        ['ki', 'Kiribati'],
        ['tv', 'Tuvalu'],
        ['to', 'Tonga'],
        ['ws', 'Samoa'],
        ['as', 'American Samoa'],
        ['ck', 'Cook Islands'],
        ['mp', 'Northern Mariana Islands'],
        ['gu', 'Guam'],
        ['um', 'United States Minor Outlying Islands'],
        ['fj', 'Fiji'],
        ['pg', 'Papua New Guinea'],
        ['sb', 'Solomon Islands'],
        ['vu', 'Vanuatu'],
        ['nc', 'New Caledonia'],
        ['pf', 'French Polynesia'],
        ['tk', 'Tokelau'],
        ['nu', 'Niue'],
        ['wf', 'Wallis and Futuna'],
        ['ck', 'Cook Islands'],
        ['ws', 'Samoa'],
        ['to', 'Tonga'],
        ['tv', 'Tuvalu'],
        ['fm', 'Micronesia'],
        ['mh', 'Marshall Islands'],
        ['pw', 'Palau'],
        ['ki', 'Kiribati'],
        ['nr', 'Nauru'],
        ['tl', 'Timor-Leste'],
        ['sb', 'Solomon Islands'],
        ['pg', 'Papua New Guinea'],
        ['au', 'Australia'],
        ['nz', 'New Zealand'],
        ['fj', 'Fiji'],
        ['nc', 'New Caledonia'],
        ['pf', 'French Polynesia'],
        ['tk', 'Tokelau'],
        ['nu', 'Niue'],
        ['wf', 'Wallis and Futuna'],
        ['ck', 'Cook Islands'],
        ['ws', 'Samoa'],
        ['to', 'Tonga'],
        ['tv', 'Tuvalu'],
        ['fm', 'Micronesia'],
        ['mh', 'Marshall Islands'],
        ['pw', 'Palau'],
        ['ki', 'Kiribati'],
        ['nr', 'Nauru'],
        ['tl', 'Timor-Leste'],
    ]);
    // Authoritative country-code -> representative IANA timezone. Used by the
    // dropdown builder so auto-generated country options resolve to the correct
    // zone instead of a fragile substring guess (which mapped Panama->Pago_Pago,
    // Lesotho->Helsinki, Ecuador/Eswatini/El Salvador->UTC, etc.).
    const countryCodePrimaryTimezone = new Map([
        ['us', 'America/New_York'], ['ca', 'America/Toronto'], ['mx', 'America/Mexico_City'],
        ['br', 'America/Sao_Paulo'], ['au', 'Australia/Sydney'], ['gb', 'Europe/London'],
        ['de', 'Europe/Berlin'], ['fr', 'Europe/Paris'], ['it', 'Europe/Rome'],
        ['es', 'Europe/Madrid'], ['ru', 'Europe/Moscow'], ['cn', 'Asia/Shanghai'],
        ['in', 'Asia/Kolkata'], ['jp', 'Asia/Tokyo'], ['za', 'Africa/Johannesburg'],
        ['nz', 'Pacific/Auckland'], ['ar', 'America/Argentina/Buenos_Aires'], ['cl', 'America/Santiago'],
        ['id', 'Asia/Jakarta'], ['ph', 'Asia/Manila'], ['cr', 'America/Costa_Rica'],
        ['pa', 'America/Panama'], ['gt', 'America/Guatemala'], ['hn', 'America/Tegucigalpa'],
        ['ni', 'America/Managua'], ['bz', 'America/Belize'], ['sv', 'America/El_Salvador'],
        ['do', 'America/Santo_Domingo'], ['jm', 'America/Jamaica'], ['cu', 'America/Havana'],
        ['co', 'America/Bogota'], ['ve', 'America/Caracas'], ['ec', 'America/Guayaquil'],
        ['pe', 'America/Lima'], ['bo', 'America/La_Paz'], ['py', 'America/Asuncion'],
        ['uy', 'America/Montevideo'], ['fi', 'Europe/Helsinki'], ['se', 'Europe/Stockholm'],
        ['no', 'Europe/Oslo'], ['dk', 'Europe/Copenhagen'], ['pl', 'Europe/Warsaw'],
        ['nl', 'Europe/Amsterdam'], ['be', 'Europe/Brussels'], ['pt', 'Europe/Lisbon'],
        ['ie', 'Europe/Dublin'], ['ch', 'Europe/Zurich'], ['at', 'Europe/Vienna'],
        ['cz', 'Europe/Prague'], ['sk', 'Europe/Bratislava'], ['hu', 'Europe/Budapest'],
        ['ro', 'Europe/Bucharest'], ['bg', 'Europe/Sofia'], ['gr', 'Europe/Athens'],
        ['ua', 'Europe/Kiev'], ['by', 'Europe/Minsk'], ['lt', 'Europe/Vilnius'],
        ['lv', 'Europe/Riga'], ['ee', 'Europe/Tallinn'], ['md', 'Europe/Chisinau'],
        ['rs', 'Europe/Belgrade'], ['hr', 'Europe/Zagreb'], ['si', 'Europe/Ljubljana'],
        ['ba', 'Europe/Sarajevo'], ['me', 'Europe/Podgorica'], ['al', 'Europe/Tirane'],
        ['mk', 'Europe/Skopje'], ['tr', 'Europe/Istanbul'], ['ge', 'Asia/Tbilisi'],
        ['az', 'Asia/Baku'], ['am', 'Asia/Yerevan'], ['kz', 'Asia/Almaty'],
        ['tm', 'Asia/Ashgabat'], ['uz', 'Asia/Tashkent'], ['kg', 'Asia/Bishkek'],
        ['tj', 'Asia/Dushanbe'], ['af', 'Asia/Kabul'], ['pk', 'Asia/Karachi'],
        ['bd', 'Asia/Dhaka'], ['mm', 'Asia/Yangon'], ['th', 'Asia/Bangkok'],
        ['vn', 'Asia/Ho_Chi_Minh'], ['la', 'Asia/Vientiane'], ['kh', 'Asia/Phnom_Penh'],
        ['my', 'Asia/Kuala_Lumpur'], ['sg', 'Asia/Singapore'], ['kr', 'Asia/Seoul'],
        ['kp', 'Asia/Pyongyang'], ['tw', 'Asia/Taipei'], ['mo', 'Asia/Macau'],
        ['hk', 'Asia/Hong_Kong'], ['mn', 'Asia/Ulaanbaatar'], ['sa', 'Asia/Riyadh'],
        ['ae', 'Asia/Dubai'], ['qa', 'Asia/Qatar'], ['kw', 'Asia/Kuwait'],
        ['om', 'Asia/Muscat'], ['ye', 'Asia/Aden'], ['iq', 'Asia/Baghdad'],
        ['ir', 'Asia/Tehran'], ['sy', 'Asia/Damascus'], ['jo', 'Asia/Amman'],
        ['lb', 'Asia/Beirut'], ['il', 'Asia/Jerusalem'], ['ps', 'Asia/Gaza'],
        ['eg', 'Africa/Cairo'], ['ly', 'Africa/Tripoli'], ['tn', 'Africa/Tunis'],
        ['dz', 'Africa/Algiers'], ['ma', 'Africa/Casablanca'], ['eh', 'Africa/El_Aaiun'],
        ['sd', 'Africa/Khartoum'], ['ss', 'Africa/Juba'], ['et', 'Africa/Addis_Ababa'],
        ['er', 'Africa/Asmara'], ['dj', 'Africa/Djibouti'], ['so', 'Africa/Mogadishu'],
        ['ke', 'Africa/Nairobi'], ['ug', 'Africa/Kampala'], ['tz', 'Africa/Dar_es_Salaam'],
        ['rw', 'Africa/Kigali'], ['bi', 'Africa/Bujumbura'], ['mw', 'Africa/Blantyre'],
        ['zm', 'Africa/Lusaka'], ['zw', 'Africa/Harare'], ['mz', 'Africa/Maputo'],
        ['ao', 'Africa/Luanda'], ['na', 'Africa/Windhoek'], ['bw', 'Africa/Gaborone'],
        ['sz', 'Africa/Mbabane'], ['ls', 'Africa/Maseru'], ['mg', 'Indian/Antananarivo'],
        ['cm', 'Africa/Douala'], ['ga', 'Africa/Libreville'], ['cg', 'Africa/Brazzaville'],
        ['cd', 'Africa/Kinshasa'], ['gq', 'Africa/Malabo'], ['cf', 'Africa/Bangui'],
        ['td', 'Africa/Ndjamena'], ['ne', 'Africa/Niamey'], ['ng', 'Africa/Lagos'],
        ['bj', 'Africa/Porto-Novo'], ['tg', 'Africa/Lome'], ['gh', 'Africa/Accra'],
        ['ci', 'Africa/Abidjan'], ['bf', 'Africa/Ouagadougou'], ['sl', 'Africa/Freetown'],
        ['lr', 'Africa/Monrovia'], ['gw', 'Africa/Bissau'], ['gn', 'Africa/Conakry'],
        ['gm', 'Africa/Banjul'], ['sn', 'Africa/Dakar'], ['mr', 'Africa/Nouakchott'],
        ['ml', 'Africa/Bamako'], ['fo', 'Atlantic/Faroe'], ['is', 'Atlantic/Reykjavik'],
        ['gl', 'America/Nuuk'], ['mc', 'Europe/Monaco'], ['ad', 'Europe/Andorra'],
        ['sm', 'Europe/San_Marino'], ['va', 'Europe/Vatican'], ['li', 'Europe/Vaduz'],
        ['mt', 'Europe/Malta'], ['cy', 'Asia/Nicosia'], ['xk', 'Europe/Belgrade'],
        ['km', 'Indian/Comoro'], ['sc', 'Indian/Mahe'], ['mu', 'Indian/Mauritius'],
        ['re', 'Indian/Reunion'], ['yt', 'Indian/Mayotte'], ['st', 'Africa/Sao_Tome'],
        ['cv', 'Atlantic/Cape_Verde'], ['sh', 'Atlantic/St_Helena'], ['tf', 'Indian/Kerguelen'],
        ['pm', 'America/Miquelon'], ['bl', 'America/St_Barthelemy'], ['mf', 'America/Marigot'],
        ['gp', 'America/Guadeloupe'], ['mq', 'America/Martinique'], ['gf', 'America/Cayenne'],
        ['sr', 'America/Paramaribo'], ['gy', 'America/Guyana'], ['tt', 'America/Port_of_Spain'],
        ['bb', 'America/Barbados'], ['lc', 'America/St_Lucia'], ['vc', 'America/St_Vincent'],
        ['gd', 'America/Grenada'], ['ag', 'America/Antigua'], ['dm', 'America/Dominica'],
        ['kn', 'America/St_Kitts'], ['bs', 'America/Nassau'], ['ht', 'America/Port-au-Prince'],
        ['pr', 'America/Puerto_Rico'], ['vi', 'America/St_Thomas'], ['vg', 'America/Tortola'],
        ['ai', 'America/Anguilla'], ['ms', 'America/Montserrat'], ['tc', 'America/Grand_Turk'],
        ['ky', 'America/Cayman'], ['bm', 'Atlantic/Bermuda'], ['sj', 'Arctic/Longyearbyen'],
        ['aq', 'Antarctica/McMurdo'], ['cx', 'Indian/Christmas'], ['cc', 'Indian/Cocos'],
        ['nf', 'Pacific/Norfolk'], ['nu', 'Pacific/Niue'], ['tk', 'Pacific/Fakaofo'],
        ['wf', 'Pacific/Wallis'], ['pf', 'Pacific/Tahiti'], ['nc', 'Pacific/Noumea'],
        ['vu', 'Pacific/Efate'], ['sb', 'Pacific/Guadalcanal'], ['fm', 'Pacific/Pohnpei'],
        ['mh', 'Pacific/Majuro'], ['pw', 'Pacific/Palau'], ['ki', 'Pacific/Tarawa'],
        ['tv', 'Pacific/Funafuti'], ['to', 'Pacific/Tongatapu'], ['ws', 'Pacific/Apia'],
        ['as', 'Pacific/Pago_Pago'], ['ck', 'Pacific/Rarotonga'], ['mp', 'Pacific/Saipan'],
        ['gu', 'Pacific/Guam'], ['um', 'Pacific/Wake'], ['fj', 'Pacific/Fiji'],
        ['pg', 'Pacific/Port_Moresby'], ['nr', 'Pacific/Nauru'], ['tl', 'Asia/Dili']
    ]);
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartScrollLeft = 0;
    let dragStartScrollTop = 0;
    let latestDragClientX = 0;
    let latestDragClientY = 0;
    let dragRafId = null;
    let wheelZoomRafId = null;
    let pendingWheelZoomValue = null;
    let pendingWheelZoomClientX = 0;
    let pendingWheelZoomClientY = 0;
    let resizeDebounceId = null;
    let suppressClick = false;
    let isRecentering = false;
    let cachedTileWidth = 0;
    let cachedTileHeight = 0;
    let mapInteractionTimeoutId = null;
    let hoveredShapeKey = '';
    let selectedCountry = 'No country selected';
    let selectedTimezone = '';
    const browserResolvedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    let chipSelectedTimezone = browserResolvedTimezone;
    const chipTimezoneLookup = new Map();
    let chipTimezoneAllOptions = [];
    const chipTimezoneAliasEntries = [
        // India — all major cities + country name
        ['India', 'Asia/Kolkata'],
        ['IST', 'Asia/Kolkata'],
        ['New Delhi', 'Asia/Kolkata'],
        ['Delhi', 'Asia/Kolkata'],
        ['Mumbai', 'Asia/Kolkata'],
        ['Bombay', 'Asia/Kolkata'],
        ['Kolkata', 'Asia/Kolkata'],
        ['Calcutta', 'Asia/Kolkata'],
        ['Chennai', 'Asia/Kolkata'],
        ['Madras', 'Asia/Kolkata'],
        ['Bangalore', 'Asia/Kolkata'],
        ['Bengaluru', 'Asia/Kolkata'],
        ['Hyderabad', 'Asia/Kolkata'],
        ['Ahmedabad', 'Asia/Kolkata'],
        ['Pune', 'Asia/Kolkata'],
        ['Jaipur', 'Asia/Kolkata'],
        ['Lucknow', 'Asia/Kolkata'],
        ['Chandigarh', 'Asia/Kolkata'],
        ['Bhopal', 'Asia/Kolkata'],
        ['Patna', 'Asia/Kolkata'],
        ['Surat', 'Asia/Kolkata'],
        ['Nagpur', 'Asia/Kolkata'],
        ['Indore', 'Asia/Kolkata'],
        ['Visakhapatnam', 'Asia/Kolkata'],
        ['Coimbatore', 'Asia/Kolkata'],
        ['Kochi', 'Asia/Kolkata'],
        ['Goa', 'Asia/Kolkata'],
        ['Amritsar', 'Asia/Kolkata'],
        ['Varanasi', 'Asia/Kolkata'],
        // USA
        ['San Francisco', 'America/Los_Angeles'],
        ['Los Angeles', 'America/Los_Angeles'],
        ['San Diego', 'America/Los_Angeles'],
        ['Sacramento', 'America/Los_Angeles'],
        ['San Jose', 'America/Los_Angeles'],
        ['Las Vegas', 'America/Los_Angeles'],
        ['Portland', 'America/Los_Angeles'],
        ['Seattle', 'America/Los_Angeles'],
        ['Redmond', 'America/Los_Angeles'],
        ['Anchorage', 'America/Anchorage'],
        ['Juneau', 'America/Anchorage'],
        ['Fairbanks', 'America/Anchorage'],
        ['Phoenix', 'America/Phoenix'],
        ['Tucson', 'America/Phoenix'],
        ['Denver', 'America/Denver'],
        ['Salt Lake City', 'America/Denver'],
        ['Albuquerque', 'America/Denver'],
        ['Boise', 'America/Denver'],
        ['Chicago', 'America/Chicago'],
        ['Dallas', 'America/Chicago'],
        ['Houston', 'America/Chicago'],
        ['San Antonio', 'America/Chicago'],
        ['Austin', 'America/Chicago'],
        ['Minneapolis', 'America/Chicago'],
        ['Kansas City', 'America/Chicago'],
        ['St Louis', 'America/Chicago'],
        ['Milwaukee', 'America/Chicago'],
        ['New Orleans', 'America/Chicago'],
        ['Memphis', 'America/Chicago'],
        ['Omaha', 'America/Chicago'],
        ['New York', 'America/New_York'],
        ['NYC', 'America/New_York'],
        ['New York City', 'America/New_York'],
        ['Boston', 'America/New_York'],
        ['Philadelphia', 'America/New_York'],
        ['Washington DC', 'America/New_York'],
        ['Washington', 'America/New_York'],
        ['Baltimore', 'America/New_York'],
        ['Atlanta', 'America/New_York'],
        ['Miami', 'America/New_York'],
        ['Charlotte', 'America/New_York'],
        ['Pittsburgh', 'America/New_York'],
        ['Cincinnati', 'America/New_York'],
        ['Cleveland', 'America/New_York'],
        ['Detroit', 'America/Detroit'],
        ['Columbus', 'America/New_York'],
        ['Indianapolis', 'America/Indiana/Indianapolis'],
        ['Nashville', 'America/Chicago'],
        ['Louisville', 'America/Kentucky/Louisville'],
        ['Jacksonville', 'America/New_York'],
        ['Tampa', 'America/New_York'],
        ['Orlando', 'America/New_York'],
        ['Fort Lauderdale', 'America/New_York'],
        ['Honolulu', 'Pacific/Honolulu'],
        ['Hilo', 'Pacific/Honolulu'],
        ['Hawaii', 'Pacific/Honolulu'],
        // Canada
        ['Vancouver', 'America/Vancouver'],
        ['Victoria BC', 'America/Vancouver'],
        ['Calgary', 'America/Edmonton'],
        ['Edmonton', 'America/Edmonton'],
        ['Saskatoon', 'America/Regina'],
        ['Regina', 'America/Regina'],
        ['Winnipeg', 'America/Winnipeg'],
        ['Toronto', 'America/Toronto'],
        ['Ottawa', 'America/Toronto'],
        ['Montreal', 'America/Toronto'],
        ['Quebec City', 'America/Toronto'],
        ['Halifax', 'America/Halifax'],
        ['Moncton', 'America/Moncton'],
        ['St Johns', 'America/St_Johns'],
        ['Newfoundland', 'America/St_Johns'],
        // Mexico & Central America
        ['Mexico City', 'America/Mexico_City'],
        ['Guadalajara', 'America/Mexico_City'],
        ['Monterrey', 'America/Monterrey'],
        ['Tijuana', 'America/Tijuana'],
        ['Cancun', 'America/Cancun'],
        ['Guatemala City', 'America/Guatemala'],
        ['San Salvador', 'America/El_Salvador'],
        ['Tegucigalpa', 'America/Tegucigalpa'],
        ['Managua', 'America/Managua'],
        ['Costa Rica', 'America/Costa_Rica'],
        ['San Jose Costa Rica', 'America/Costa_Rica'],
        ['San Jose', 'America/Costa_Rica'],
        ['Panama City', 'America/Panama'],
        // Caribbean
        ['Havana', 'America/Havana'],
        ['Cuba', 'America/Havana'],
        ['Kingston', 'America/Jamaica'],
        ['Jamaica', 'America/Jamaica'],
        ['Puerto Rico', 'America/Puerto_Rico'],
        ['San Juan', 'America/Puerto_Rico'],
        ['Port of Spain', 'America/Port_of_Spain'],
        ['Trinidad', 'America/Port_of_Spain'],
        // South America
        ['Bogota', 'America/Bogota'],
        ['Colombia', 'America/Bogota'],
        ['Cali', 'America/Bogota'],
        ['Medellin', 'America/Bogota'],
        ['Lima', 'America/Lima'],
        ['Peru', 'America/Lima'],
        ['Quito', 'America/Guayaquil'],
        ['Guayaquil', 'America/Guayaquil'],
        ['Caracas', 'America/Caracas'],
        ['Venezuela', 'America/Caracas'],
        ['Sao Paulo', 'America/Sao_Paulo'],
        ['Rio de Janeiro', 'America/Sao_Paulo'],
        ['Brasilia', 'America/Sao_Paulo'],
        ['Brazil', 'America/Sao_Paulo'],
        ['Santiago', 'America/Santiago'],
        ['Chile', 'America/Santiago'],
        ['Buenos Aires', 'America/Argentina/Buenos_Aires'],
        ['Argentina', 'America/Argentina/Buenos_Aires'],
        ['Cordoba', 'America/Argentina/Cordoba'],
        ['Montevideo', 'America/Montevideo'],
        ['Asuncion', 'America/Asuncion'],
        ['La Paz', 'America/La_Paz'],
        ['Bolivia', 'America/La_Paz'],
        // UK & Ireland
        ['London', 'Europe/London'],
        ['England', 'Europe/London'],
        ['United Kingdom', 'Europe/London'],
        ['UK', 'Europe/London'],
        ['Manchester', 'Europe/London'],
        ['Birmingham', 'Europe/London'],
        ['Edinburgh', 'Europe/London'],
        ['Scotland', 'Europe/London'],
        ['Cardiff', 'Europe/London'],
        ['Wales', 'Europe/London'],
        ['Belfast', 'Europe/London'],
        ['Dublin', 'Europe/Dublin'],
        ['Ireland', 'Europe/Dublin'],
        ['Cork', 'Europe/Dublin'],
        // Western Europe
        ['Paris', 'Europe/Paris'],
        ['France', 'Europe/Paris'],
        ['Lyon', 'Europe/Paris'],
        ['Marseille', 'Europe/Paris'],
        ['Toulouse', 'Europe/Paris'],
        ['Berlin', 'Europe/Berlin'],
        ['Germany', 'Europe/Berlin'],
        ['Munich', 'Europe/Berlin'],
        ['Hamburg', 'Europe/Berlin'],
        ['Frankfurt', 'Europe/Berlin'],
        ['Cologne', 'Europe/Berlin'],
        ['Dusseldorf', 'Europe/Berlin'],
        ['Stuttgart', 'Europe/Berlin'],
        ['Amsterdam', 'Europe/Amsterdam'],
        ['Netherlands', 'Europe/Amsterdam'],
        ['Rotterdam', 'Europe/Amsterdam'],
        ['Brussels', 'Europe/Brussels'],
        ['Belgium', 'Europe/Brussels'],
        ['Antwerp', 'Europe/Brussels'],
        ['Madrid', 'Europe/Madrid'],
        ['Spain', 'Europe/Madrid'],
        ['Barcelona', 'Europe/Madrid'],
        ['Valencia', 'Europe/Madrid'],
        ['Seville', 'Europe/Madrid'],
        ['Lisbon', 'Europe/Lisbon'],
        ['Portugal', 'Europe/Lisbon'],
        ['Porto', 'Europe/Lisbon'],
        ['Rome', 'Europe/Rome'],
        ['Italy', 'Europe/Rome'],
        ['Milan', 'Europe/Rome'],
        ['Naples', 'Europe/Rome'],
        ['Turin', 'Europe/Rome'],
        ['Venice', 'Europe/Rome'],
        ['Florence', 'Europe/Rome'],
        ['Bern', 'Europe/Zurich'],
        ['Zurich', 'Europe/Zurich'],
        ['Switzerland', 'Europe/Zurich'],
        ['Geneva', 'Europe/Zurich'],
        ['Vienna', 'Europe/Vienna'],
        ['Austria', 'Europe/Vienna'],
        ['Graz', 'Europe/Vienna'],
        ['Prague', 'Europe/Prague'],
        ['Czech Republic', 'Europe/Prague'],
        ['Czechia', 'Europe/Prague'],
        ['Budapest', 'Europe/Budapest'],
        ['Hungary', 'Europe/Budapest'],
        ['Warsaw', 'Europe/Warsaw'],
        ['Poland', 'Europe/Warsaw'],
        ['Krakow', 'Europe/Warsaw'],
        ['Stockholm', 'Europe/Stockholm'],
        ['Sweden', 'Europe/Stockholm'],
        ['Gothenburg', 'Europe/Stockholm'],
        ['Oslo', 'Europe/Oslo'],
        ['Norway', 'Europe/Oslo'],
        ['Copenhagen', 'Europe/Copenhagen'],
        ['Denmark', 'Europe/Copenhagen'],
        ['Helsinki', 'Europe/Helsinki'],
        ['Finland', 'Europe/Helsinki'],
        ['Tallinn', 'Europe/Tallinn'],
        ['Estonia', 'Europe/Tallinn'],
        ['Riga', 'Europe/Riga'],
        ['Latvia', 'Europe/Riga'],
        ['Vilnius', 'Europe/Vilnius'],
        ['Lithuania', 'Europe/Vilnius'],
        // South & East Europe
        ['Athens', 'Europe/Athens'],
        ['Greece', 'Europe/Athens'],
        ['Thessaloniki', 'Europe/Athens'],
        ['Bucharest', 'Europe/Bucharest'],
        ['Romania', 'Europe/Bucharest'],
        ['Sofia', 'Europe/Sofia'],
        ['Bulgaria', 'Europe/Sofia'],
        ['Belgrade', 'Europe/Belgrade'],
        ['Serbia', 'Europe/Belgrade'],
        ['Zagreb', 'Europe/Zagreb'],
        ['Croatia', 'Europe/Zagreb'],
        ['Sarajevo', 'Europe/Sarajevo'],
        ['Ljubljana', 'Europe/Ljubljana'],
        ['Bratislava', 'Europe/Bratislava'],
        ['Skopje', 'Europe/Skopje'],
        ['Tirane', 'Europe/Tirane'],
        ['Tirana', 'Europe/Tirane'],
        ['Kiev', 'Europe/Kiev'],
        ['Kyiv', 'Europe/Kiev'],
        ['Ukraine', 'Europe/Kiev'],
        ['Minsk', 'Europe/Minsk'],
        ['Belarus', 'Europe/Minsk'],
        ['Istanbul', 'Europe/Istanbul'],
        ['Turkey', 'Europe/Istanbul'],
        ['Ankara', 'Europe/Istanbul'],
        ['Izmir', 'Europe/Istanbul'],
        ['Reykjavik', 'Atlantic/Reykjavik'],
        ['Iceland', 'Atlantic/Reykjavik'],
        ['Greenland', 'America/Godthab'],
        ['Nuuk', 'America/Godthab'],
        // Russia
        ['Moscow', 'Europe/Moscow'],
        ['Russia', 'Europe/Moscow'],
        ['Saint Petersburg', 'Europe/Moscow'],
        ['St Petersburg', 'Europe/Moscow'],
        ['Novosibirsk', 'Asia/Novosibirsk'],
        ['Krasnoyarsk', 'Asia/Krasnoyarsk'],
        ['Irkutsk', 'Asia/Irkutsk'],
        ['Vladivostok', 'Asia/Vladivostok'],
        ['Yekaterinburg', 'Asia/Yekaterinburg'],
        // Middle East
        ['Dubai', 'Asia/Dubai'],
        ['UAE', 'Asia/Dubai'],
        ['Abu Dhabi', 'Asia/Dubai'],
        ['Sharjah', 'Asia/Dubai'],
        ['Riyadh', 'Asia/Riyadh'],
        ['Saudi Arabia', 'Asia/Riyadh'],
        ['Jeddah', 'Asia/Riyadh'],
        ['Mecca', 'Asia/Riyadh'],
        ['Medina', 'Asia/Riyadh'],
        ['Kuwait City', 'Asia/Kuwait'],
        ['Kuwait', 'Asia/Kuwait'],
        ['Doha', 'Asia/Qatar'],
        ['Qatar', 'Asia/Qatar'],
        ['Manama', 'Asia/Bahrain'],
        ['Bahrain', 'Asia/Bahrain'],
        ['Muscat', 'Asia/Muscat'],
        ['Oman', 'Asia/Muscat'],
        ['Tehran', 'Asia/Tehran'],
        ['Iran', 'Asia/Tehran'],
        ['Baghdad', 'Asia/Baghdad'],
        ['Iraq', 'Asia/Baghdad'],
        ['Amman', 'Asia/Amman'],
        ['Jordan', 'Asia/Amman'],
        ['Damascus', 'Asia/Damascus'],
        ['Syria', 'Asia/Damascus'],
        ['Beirut', 'Asia/Beirut'],
        ['Lebanon', 'Asia/Beirut'],
        ['Jerusalem', 'Asia/Jerusalem'],
        ['Tel Aviv', 'Asia/Jerusalem'],
        ['Israel', 'Asia/Jerusalem'],
        ['Tbilisi', 'Asia/Tbilisi'],
        ['Georgia', 'Asia/Tbilisi'],
        ['Baku', 'Asia/Baku'],
        ['Azerbaijan', 'Asia/Baku'],
        ['Yerevan', 'Asia/Yerevan'],
        ['Armenia', 'Asia/Yerevan'],
        // Central Asia
        ['Kabul', 'Asia/Kabul'],
        ['Afghanistan', 'Asia/Kabul'],
        ['Karachi', 'Asia/Karachi'],
        ['Pakistan', 'Asia/Karachi'],
        ['Lahore', 'Asia/Karachi'],
        ['Islamabad', 'Asia/Karachi'],
        ['Tashkent', 'Asia/Tashkent'],
        ['Uzbekistan', 'Asia/Tashkent'],
        ['Almaty', 'Asia/Almaty'],
        ['Kazakhstan', 'Asia/Almaty'],
        ['Astana', 'Asia/Almaty'],
        ['Nur-Sultan', 'Asia/Almaty'],
        // Nepal & Sri Lanka
        ['Kathmandu', 'Asia/Kathmandu'],
        ['Nepal', 'Asia/Kathmandu'],
        ['Colombo', 'Asia/Colombo'],
        ['Sri Lanka', 'Asia/Colombo'],
        // Bangladesh & Myanmar
        ['Dhaka', 'Asia/Dhaka'],
        ['Bangladesh', 'Asia/Dhaka'],
        ['Chittagong', 'Asia/Dhaka'],
        ['Yangon', 'Asia/Rangoon'],
        ['Rangoon', 'Asia/Rangoon'],
        ['Myanmar', 'Asia/Rangoon'],
        ['Burma', 'Asia/Rangoon'],
        // Southeast Asia
        ['Bangkok', 'Asia/Bangkok'],
        ['Thailand', 'Asia/Bangkok'],
        ['Chiang Mai', 'Asia/Bangkok'],
        ['Phuket', 'Asia/Bangkok'],
        ['Ho Chi Minh City', 'Asia/Ho_Chi_Minh'],
        ['Saigon', 'Asia/Ho_Chi_Minh'],
        ['Hanoi', 'Asia/Ho_Chi_Minh'],
        ['Vietnam', 'Asia/Ho_Chi_Minh'],
        ['Phnom Penh', 'Asia/Phnom_Penh'],
        ['Cambodia', 'Asia/Phnom_Penh'],
        ['Vientiane', 'Asia/Vientiane'],
        ['Laos', 'Asia/Vientiane'],
        ['Jakarta', 'Asia/Jakarta'],
        ['Surabaya', 'Asia/Jakarta'],
        ['Bandung', 'Asia/Jakarta'],
        ['Indonesia', 'Asia/Jakarta'],
        ['Bali', 'Asia/Makassar'],
        ['Makassar', 'Asia/Makassar'],
        ['Kuala Lumpur', 'Asia/Kuala_Lumpur'],
        ['Malaysia', 'Asia/Kuala_Lumpur'],
        ['Singapore', 'Asia/Singapore'],
        ['Manila', 'Asia/Manila'],
        ['Philippines', 'Asia/Manila'],
        ['Cebu', 'Asia/Manila'],
        ['Brunei', 'Asia/Brunei'],
        // East Asia
        ['Hong Kong', 'Asia/Hong_Kong'],
        ['Shanghai', 'Asia/Shanghai'],
        ['Beijing', 'Asia/Shanghai'],
        ['China', 'Asia/Shanghai'],
        ['Guangzhou', 'Asia/Shanghai'],
        ['Shenzhen', 'Asia/Shanghai'],
        ['Chengdu', 'Asia/Shanghai'],
        ['Chongqing', 'Asia/Shanghai'],
        ['Wuhan', 'Asia/Shanghai'],
        ['Xian', 'Asia/Shanghai'],
        ['Taipei', 'Asia/Taipei'],
        ['Taiwan', 'Asia/Taipei'],
        ['Seoul', 'Asia/Seoul'],
        ['South Korea', 'Asia/Seoul'],
        ['Korea', 'Asia/Seoul'],
        ['Busan', 'Asia/Seoul'],
        ['Tokyo', 'Asia/Tokyo'],
        ['Japan', 'Asia/Tokyo'],
        ['Osaka', 'Asia/Tokyo'],
        ['Kyoto', 'Asia/Tokyo'],
        ['Sapporo', 'Asia/Tokyo'],
        ['Yokohama', 'Asia/Tokyo'],
        ['Ulaanbaatar', 'Asia/Ulaanbaatar'],
        ['Mongolia', 'Asia/Ulaanbaatar'],
        // Africa
        ['Cairo', 'Africa/Cairo'],
        ['Egypt', 'Africa/Cairo'],
        ['Alexandria', 'Africa/Cairo'],
        ['Lagos', 'Africa/Lagos'],
        ['Nigeria', 'Africa/Lagos'],
        ['Abuja', 'Africa/Lagos'],
        ['Nairobi', 'Africa/Nairobi'],
        ['Kenya', 'Africa/Nairobi'],
        ['Mombasa', 'Africa/Nairobi'],
        ['Johannesburg', 'Africa/Johannesburg'],
        ['South Africa', 'Africa/Johannesburg'],
        ['Cape Town', 'Africa/Johannesburg'],
        ['Durban', 'Africa/Johannesburg'],
        ['Pretoria', 'Africa/Johannesburg'],
        ['Casablanca', 'Africa/Casablanca'],
        ['Morocco', 'Africa/Casablanca'],
        ['Algiers', 'Africa/Algiers'],
        ['Algeria', 'Africa/Algiers'],
        ['Tunis', 'Africa/Tunis'],
        ['Tunisia', 'Africa/Tunis'],
        ['Tripoli', 'Africa/Tripoli'],
        ['Libya', 'Africa/Tripoli'],
        ['Khartoum', 'Africa/Khartoum'],
        ['Sudan', 'Africa/Khartoum'],
        ['Addis Ababa', 'Africa/Addis_Ababa'],
        ['Ethiopia', 'Africa/Addis_Ababa'],
        ['Dar es Salaam', 'Africa/Dar_es_Salaam'],
        ['Tanzania', 'Africa/Dar_es_Salaam'],
        ['Kampala', 'Africa/Kampala'],
        ['Uganda', 'Africa/Kampala'],
        ['Lusaka', 'Africa/Lusaka'],
        ['Zambia', 'Africa/Lusaka'],
        ['Harare', 'Africa/Harare'],
        ['Zimbabwe', 'Africa/Harare'],
        ['Accra', 'Africa/Accra'],
        ['Ghana', 'Africa/Accra'],
        ['Dakar', 'Africa/Dakar'],
        ['Senegal', 'Africa/Dakar'],
        ['Abidjan', 'Africa/Abidjan'],
        ['Ivory Coast', 'Africa/Abidjan'],
        ['Kinshasa', 'Africa/Kinshasa'],
        ['Congo', 'Africa/Kinshasa'],
        ['Luanda', 'Africa/Luanda'],
        ['Angola', 'Africa/Luanda'],
        ['Maputo', 'Africa/Maputo'],
        ['Mozambique', 'Africa/Maputo'],
        ['Antananarivo', 'Indian/Antananarivo'],
        ['Madagascar', 'Indian/Antananarivo'],
        // Australia & Pacific
        ['Sydney', 'Australia/Sydney'],
        ['Melbourne', 'Australia/Melbourne'],
        ['Australia', 'Australia/Sydney'],
        ['Canberra', 'Australia/Sydney'],
        ['Brisbane', 'Australia/Brisbane'],
        ['Queensland', 'Australia/Brisbane'],
        ['Adelaide', 'Australia/Adelaide'],
        ['South Australia', 'Australia/Adelaide'],
        ['Perth', 'Australia/Perth'],
        ['Western Australia', 'Australia/Perth'],
        ['Darwin', 'Australia/Darwin'],
        ['Northern Territory', 'Australia/Darwin'],
        ['Hobart', 'Australia/Hobart'],
        ['Tasmania', 'Australia/Hobart'],
        ['Auckland', 'Pacific/Auckland'],
        ['New Zealand', 'Pacific/Auckland'],
        ['Wellington', 'Pacific/Auckland'],
        ['Christchurch', 'Pacific/Auckland'],
        ['Fiji', 'Pacific/Fiji'],
        ['Suva', 'Pacific/Fiji'],
        ['Papua New Guinea', 'Pacific/Port_Moresby'],
        ['Port Moresby', 'Pacific/Port_Moresby'],
        ['Guam', 'Pacific/Guam'],
        ['Noumea', 'Pacific/Noumea'],
        ['New Caledonia', 'Pacific/Noumea'],
        ['Samoa', 'Pacific/Apia'],
        ['Apia', 'Pacific/Apia'],
        ['Tonga', 'Pacific/Tongatapu'],
        ['Nukualofa', 'Pacific/Tongatapu'],
        // UTC
        ['UTC', 'UTC'],
        ['GMT', 'UTC']
    ];
    const timezonePinCountryMap = {
        'America/Anchorage': 'United States',
        'America/Chicago': 'United States',
        'America/Costa_Rica': 'Costa Rica',
        'America/Denver': 'United States',
        'America/Los_Angeles': 'United States',
        'America/Mexico_City': 'Mexico',
        'America/New_York': 'United States',
        'America/Phoenix': 'United States',
        'America/Sao_Paulo': 'Brazil',
        'America/Tijuana': 'Mexico',
        'America/Toronto': 'Canada',
        'America/Godthab': 'Greenland',
        'America/Vancouver': 'Canada',
        'Atlantic/Reykjavik': 'Iceland',
        'Europe/Amsterdam': 'Netherlands',
        'Europe/Athens': 'Greece',
        'Europe/Belgrade': 'Serbia',
        'Europe/Berlin': 'Germany',
        'Europe/Brussels': 'Belgium',
        'Europe/Bucharest': 'Romania',
        'Europe/Budapest': 'Hungary',
        'Europe/Copenhagen': 'Denmark',
        'Europe/Dublin': 'Ireland',
        'Europe/Helsinki': 'Finland',
        'Europe/Istanbul': 'Turkey',
        'Europe/Kiev': 'Ukraine',
        'Europe/Lisbon': 'Portugal',
        'Europe/London': 'United Kingdom',
        'Europe/Madrid': 'Spain',
        'Europe/Minsk': 'Belarus',
        'Europe/Moscow': 'Russia',
        'Europe/Oslo': 'Norway',
        'Europe/Paris': 'France',
        'Europe/Prague': 'Czech Republic',
        'Europe/Riga': 'Latvia',
        'Europe/Rome': 'Italy',
        'Europe/Skopje': 'North Macedonia',
        'Europe/Sofia': 'Bulgaria',
        'Europe/Stockholm': 'Sweden',
        'Europe/Tallinn': 'Estonia',
        'Europe/Tirane': 'Albania',
        'Europe/Vienna': 'Austria',
        'Europe/Vilnius': 'Lithuania',
        'Europe/Warsaw': 'Poland',
        'Europe/Zurich': 'Switzerland',
        'Africa/Cairo': 'Egypt',
        'Africa/Casablanca': 'Morocco',
        'Africa/Johannesburg': 'South Africa',
        'Africa/Lagos': 'Nigeria',
        'Africa/Nairobi': 'Kenya',
        'Asia/Almaty': 'Kazakhstan',
        'Asia/Baghdad': 'Iraq',
        'Asia/Bangkok': 'Thailand',
        'Asia/Beirut': 'Lebanon',
        'Asia/Colombo': 'Sri Lanka',
        'Asia/Dhaka': 'Bangladesh',
        'Asia/Dubai': 'United Arab Emirates',
        'Asia/Hong_Kong': 'Hong Kong',
        'Asia/Ho_Chi_Minh': 'Vietnam',
        'Asia/Jakarta': 'Indonesia',
        'Asia/Jerusalem': 'Israel',
        'Asia/Kabul': 'Afghanistan',
        'Asia/Karachi': 'Pakistan',
        'Asia/Kathmandu': 'Nepal',
        'Asia/Kolkata': 'India',
        'Asia/Kuala_Lumpur': 'Malaysia',
        'Asia/Manila': 'Philippines',
        'Asia/Phnom_Penh': 'Cambodia',
        'Asia/Riyadh': 'Saudi Arabia',
        'Asia/Seoul': 'South Korea',
        'Asia/Shanghai': 'China',
        'Asia/Singapore': 'Singapore',
        'Asia/Tashkent': 'Uzbekistan',
        'Asia/Tehran': 'Iran',
        'Asia/Tokyo': 'Japan',
        'Asia/Vientiane': 'Laos',
        'Asia/Yangon': 'Myanmar',
        'Asia/Rangoon': 'Myanmar',
        'Australia/Adelaide': 'Australia',
        'Australia/Brisbane': 'Australia',
        'Australia/Darwin': 'Australia',
        'Australia/Eucla': 'Australia',
        'Australia/Hobart': 'Australia',
        'Australia/Lord_Howe': 'Australia',
        'Australia/Melbourne': 'Australia',
        'Australia/Perth': 'Australia',
        'Australia/Sydney': 'Australia',
        'Pacific/Auckland': 'New Zealand',
        'Pacific/Chatham': 'New Zealand',
        'Pacific/Fiji': 'Fiji',
        'Pacific/Guam': 'Guam',
        'Pacific/Guadalcanal': 'Solomon Islands',
        'Pacific/Honolulu': 'United States',
        'Pacific/Kiritimati': 'Kiribati',
        'Pacific/Nauru': 'Nauru',
        'Pacific/Niue': 'Niue',
        'NZ': 'New Zealand',
        'Pacific/Pago_Pago': 'United States',
        'Pacific/Rarotonga': 'Cook Islands',
        'Pacific/Tarawa': 'Kiribati',
        'Pacific/Tongatapu': 'Tonga'
    };

    // Auto-populate timezone map from aliases - build comprehensive mapping
    {
        // Remember the hand-curated zone keys so the authoritative country-code
        // merge below can override fragile auto-guesses (which mistake capital
        // cities like "Quito"/"Ulaanbaatar" for country names) without clobbering
        // the curated entries above.
        const curatedCountryZones = new Set(Object.keys(timezonePinCountryMap));
        const aliasToCountry = {};
        for (const [name, timezone] of chipTimezoneAliasEntries) {
            // Identify if this entry is a country name by checking if it matches common country patterns
            const isCountryName = /^[A-Z][a-z\s&'-]+$/.test(name) && 
                                  name.length > 3 && 
                                  !name.includes('City') && 
                                  !name.includes('de') &&
                                  !name.includes('St ') &&
                                  !name.includes('Port') &&
                                  !['India', 'USA', 'USA', 'UK', 'GMT', 'UTC'].includes(name);
            
            if (isCountryName || 
                ['India', 'USA', 'Canada', 'Mexico', 'Brazil', 'Australia', 'China', 'Japan', 'UK', 'France', 'Germany', 'Spain', 'Italy', 'Russia', 'South Korea', 'Taiwan', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Malaysia', 'Singapore', 'Egypt', 'South Africa', 'Kenya', 'Nigeria', 'Morocco', 'Israel', 'Saudi Arabia', 'UAE', 'Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Afghanistan', 'Iran', 'Iraq', 'Syria', 'Lebanon', 'Jordan', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman', 'United Arab Emirates', 'Greece', 'Turkey', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Ukraine', 'Belarus', 'Russia', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Azerbaijan', 'Armenia', 'Georgia', 'New Zealand', 'Fiji', 'Samoa', 'Tonga', 'Papua New Guinea', 'Solomon Islands', 'Vanuatu', 'Kiribati', 'Marshall Islands', 'Nauru', 'Palau', 'Tuvalu', 'Iceland', 'Greenland', 'Costa Rica', 'Panama', 'Colombia', 'Peru', 'Ecuador', 'Venezuela', 'Guyana', 'Suriname', 'Bolivia', 'Paraguay', 'Uruguay', 'Argentina', 'Chile', 'Jamaica', 'Cuba', 'Dominican Republic', 'Haiti', 'Puerto Rico', 'Trinidad', 'Bahamas', 'Belize', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 'Austria', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Ireland', 'Portugal', 'Serbia', 'Croatia', 'Bosnia', 'Albania', 'North Macedonia', 'Bulgaria', 'Slovenia', 'Slovakia', 'Lithuania', 'Latvia', 'Estonia', 'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Ethiopia', 'Somalia', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'Zambia', 'Zimbabwe', 'Malawi', 'Mozambique', 'Madagascar', 'Mauritius', 'Seychelles', 'Comoros', 'Angola', 'Namibia', 'Botswana', 'Lesotho', 'Eswatini', 'Cameroon', 'Nigeria', 'Ghana', 'Ivory Coast', 'Liberia', 'Sierra Leone', 'Guinea', 'Senegal', 'Mali', 'Niger', 'Burkina Faso', 'Chad', 'Central African Republic', 'Congo', 'Democratic Republic of the Congo', 'Gabon', 'Equatorial Guinea', 'Sao Tome and Principe', 'Cape Verde', 'Mauritania', 'Morocco', 'Western Sahara'].includes(name)) {
                // Check existing map first
                if (!aliasToCountry[timezone]) {
                    aliasToCountry[timezone] = name;
                }
            }
        }
        
        // Merge discovered mappings without overriding curated entries.
        Object.keys(aliasToCountry).forEach(function(timezoneKey) {
            if (!timezonePinCountryMap[timezoneKey]) {
                timezonePinCountryMap[timezoneKey] = aliasToCountry[timezoneKey];
            }
        });

        // Ensure every country's primary timezone resolves to its country name,
        // so pins dropped at a country capital show the country (not "Ocean" or a
        // capital-city name guessed by the alias merge above). Overrides the
        // auto-merge guesses but never the curated entries.
        countryCodePrimaryTimezone.forEach(function(zone, code) {
            const name = countryCodeFallback.get(code);
            if (zone && name && !curatedCountryZones.has(zone)) {
                timezonePinCountryMap[zone] = name;
            }
        });
    }

    let draggedPinIndex = null;
    let topbarVisible = true;
    let isClockPaused = false;
    let pausedClockDate = null;
    let sliderReferenceDate = new Date();
    let sliderOffsetMinutes = 0;
    let sliderChipPointerId = null;
    let sliderChipDragClientX = 0;
    let sliderChipAutoPanRafId = null;
    let sliderChipAutoPanStrength = 0;
    let sliderChipStartX = 0;
    let sliderChipStartValue = 0;
    let railDragPointerId = null;
    let railDragStartX = 0;
    let railDragStartValue = 0;
    let mapZoom = 1;
    let chipSelectedLocationLabel = '';
    const buttonFlashTimers = new WeakMap();
    let chipPickerSelectedDate = null;
    let chipPickerDisplayMonth = null;
    let pinDropTargetIndex = null;
    const sliderMinuteRange = 2880;
    const sliderMinuteStep = 5;
    const sliderDragMinutesPerPixel = 8;
    const chipEdgePanThresholdPx = 44;
    const chipEdgePanMaxMinutesPerFrame = 8;
    const chipEdgePanExponent = 2.2;
    const mapZoomMin = 1;
    const mapZoomMax = 4.0;
    const mapZoomStep = 0.2;
    const persistCookiePins = 'tzmap_pins';
    const persistCookieChipTimezone = 'tzmap_chip_timezone';
    const persistCookieMaxAgeSeconds = 60 * 60 * 24 * 180;
    const persistCookiePinsMaxBytes = 3600;
    const persistCookieTheme = 'tzmap_theme';
    const themeMap = {
        'classic': '/static/world_timezones.svg',
        'modern': '/static/world_timezones_theme_2.svg'
    };
    const timezonePinAnchorMap = {
        'America/New_York': { lon: -74.006, lat: 40.713 },
        'America/Chicago': { lon: -87.630, lat: 41.878 },
        'America/Denver': { lon: -104.991, lat: 39.739 },
        'America/Los_Angeles': { lon: -118.244, lat: 34.052 },
        'America/Phoenix': { lon: -112.074, lat: 33.448 },
        'America/Toronto': { lon: -79.383, lat: 43.653 },
        'America/Vancouver': { lon: -123.121, lat: 49.283 },
        'America/Anchorage': { lon: -149.900, lat: 61.218 },
        'America/Mexico_City': { lon: -99.133, lat: 19.433 },
        'America/Sao_Paulo': { lon: -46.633, lat: -23.550 },
        'Europe/London': { lon: -0.128, lat: 51.507 },
        'Europe/Berlin': { lon: 13.405, lat: 52.520 },
        'Europe/Moscow': { lon: 37.617, lat: 55.756 },
        'Europe/Paris': { lon: 2.352, lat: 48.857 },
        'Europe/Madrid': { lon: -3.704, lat: 40.417 },
        'Europe/Rome': { lon: 12.496, lat: 41.902 },
        'Africa/Cairo': { lon: 31.235, lat: 30.044 },
        'Africa/Johannesburg': { lon: 28.047, lat: -26.204 },
        'Africa/Nairobi': { lon: 36.821, lat: -1.292 },
        'Africa/Lagos': { lon: 3.379, lat: 6.525 },
        'Asia/Dubai': { lon: 55.270, lat: 25.204 },
        'Asia/Kolkata': { lon: 88.364, lat: 22.572 },
        'Asia/Bangkok': { lon: 100.502, lat: 13.756 },
        'Asia/Shanghai': { lon: 121.473, lat: 31.230 },
        'Asia/Hong_Kong': { lon: 114.169, lat: 22.319 },
        'Asia/Singapore': { lon: 103.819, lat: 1.352 },
        'Asia/Seoul': { lon: 126.978, lat: 37.567 },
        'Asia/Tokyo': { lon: 139.692, lat: 35.690 },
        'Australia/Brisbane': { lon: 153.025, lat: -27.470 },
        'Australia/Sydney': { lon: 151.209, lat: -33.869 },
        'Australia/Melbourne': { lon: 144.963, lat: -37.814 },
        'Australia/Perth': { lon: 115.861, lat: -31.952 },
        'Australia/Adelaide': { lon: 138.601, lat: -34.928 },
        'Australia/Darwin': { lon: 130.845, lat: -12.463 },
        'Pacific/Auckland': { lon: 174.764, lat: -36.850 }
    };
    // Country (and territory) name -> representative capital coordinates. Used so
    // that selecting a country from the dropdown places the pin at its capital,
    // which is always on land, instead of falling through to the country's drawn
    // shape centre (whose bounding-box centre can land in the sea, e.g. Romania
    // in the Black Sea or Costa Rica in the Pacific).
    const countryCapitalAnchorMap = {
        'usa': { lon: -77.037, lat: 38.907 },
        'united states': { lon: -77.037, lat: 38.907 },
        'canada': { lon: -75.699, lat: 45.421 },
        'mexico': { lon: -99.133, lat: 19.433 },
        'brazil': { lon: -47.882, lat: -15.794 },
        'australia': { lon: 149.131, lat: -35.281 },
        'china': { lon: 116.407, lat: 39.904 },
        'japan': { lon: 139.692, lat: 35.690 },
        'uk': { lon: -0.128, lat: 51.507 },
        'united kingdom': { lon: -0.128, lat: 51.507 },
        'france': { lon: 2.352, lat: 48.857 },
        'germany': { lon: 13.405, lat: 52.520 },
        'spain': { lon: -3.704, lat: 40.417 },
        'italy': { lon: 12.496, lat: 41.902 },
        'russia': { lon: 37.617, lat: 55.756 },
        'south korea': { lon: 126.978, lat: 37.567 },
        'taiwan': { lon: 121.565, lat: 25.033 },
        'mongolia': { lon: 106.917, lat: 47.886 },
        'thailand': { lon: 100.502, lat: 13.756 },
        'vietnam': { lon: 105.834, lat: 21.028 },
        'philippines': { lon: 120.984, lat: 14.599 },
        'indonesia': { lon: 106.845, lat: -6.208 },
        'malaysia': { lon: 101.686, lat: 3.139 },
        'singapore': { lon: 103.819, lat: 1.352 },
        'egypt': { lon: 31.235, lat: 30.044 },
        'south africa': { lon: 28.188, lat: -25.746 },
        'kenya': { lon: 36.821, lat: -1.292 },
        'nigeria': { lon: 7.398, lat: 9.076 },
        'morocco': { lon: -6.834, lat: 34.020 },
        'israel': { lon: 35.214, lat: 31.768 },
        'saudi arabia': { lon: 46.675, lat: 24.713 },
        'uae': { lon: 54.377, lat: 24.454 },
        'united arab emirates': { lon: 54.377, lat: 24.454 },
        'pakistan': { lon: 73.084, lat: 33.684 },
        'india': { lon: 77.209, lat: 28.614 },
        'bangladesh': { lon: 90.407, lat: 23.810 },
        'sri lanka': { lon: 79.861, lat: 6.927 },
        'nepal': { lon: 85.324, lat: 27.717 },
        'afghanistan': { lon: 69.208, lat: 34.555 },
        'iran': { lon: 51.389, lat: 35.689 },
        'iraq': { lon: 44.361, lat: 33.315 },
        'syria': { lon: 36.278, lat: 33.513 },
        'lebanon': { lon: 35.501, lat: 33.888 },
        'jordan': { lon: 35.910, lat: 31.956 },
        'qatar': { lon: 51.531, lat: 25.286 },
        'bahrain': { lon: 50.586, lat: 26.225 },
        'kuwait': { lon: 47.978, lat: 29.376 },
        'oman': { lon: 58.408, lat: 23.588 },
        'greece': { lon: 23.728, lat: 37.984 },
        'turkey': { lon: 32.854, lat: 39.920 },
        'poland': { lon: 21.012, lat: 52.230 },
        'czech republic': { lon: 14.438, lat: 50.076 },
        'hungary': { lon: 19.040, lat: 47.498 },
        'romania': { lon: 26.102, lat: 44.426 },
        'ukraine': { lon: 30.523, lat: 50.450 },
        'belarus': { lon: 27.567, lat: 53.902 },
        'kazakhstan': { lon: 71.428, lat: 51.169 },
        'uzbekistan': { lon: 69.240, lat: 41.299 },
        'kyrgyzstan': { lon: 74.590, lat: 42.874 },
        'tajikistan': { lon: 68.787, lat: 38.560 },
        'turkmenistan': { lon: 58.383, lat: 37.960 },
        'azerbaijan': { lon: 49.867, lat: 40.409 },
        'armenia': { lon: 44.515, lat: 40.182 },
        'georgia': { lon: 44.793, lat: 41.716 },
        'new zealand': { lon: 174.776, lat: -41.286 },
        'fiji': { lon: 178.442, lat: -18.124 },
        'samoa': { lon: -171.751, lat: -13.850 },
        'tonga': { lon: -175.198, lat: -21.139 },
        'papua new guinea': { lon: 147.180, lat: -9.443 },
        'solomon islands': { lon: 159.955, lat: -9.428 },
        'vanuatu': { lon: 168.322, lat: -17.734 },
        'kiribati': { lon: 173.020, lat: 1.451 },
        'marshall islands': { lon: 171.380, lat: 7.116 },
        'nauru': { lon: 166.920, lat: -0.547 },
        'palau': { lon: 134.624, lat: 7.501 },
        'tuvalu': { lon: 179.198, lat: -8.521 },
        'iceland': { lon: -21.940, lat: 64.147 },
        'greenland': { lon: -51.694, lat: 64.182 },
        'costa rica': { lon: -84.088, lat: 9.934 },
        'panama': { lon: -79.517, lat: 8.984 },
        'colombia': { lon: -74.072, lat: 4.711 },
        'peru': { lon: -77.043, lat: -12.046 },
        'ecuador': { lon: -78.467, lat: -0.181 },
        'venezuela': { lon: -66.904, lat: 10.481 },
        'guyana': { lon: -58.155, lat: 6.801 },
        'suriname': { lon: -55.204, lat: 5.852 },
        'bolivia': { lon: -68.150, lat: -16.500 },
        'paraguay': { lon: -57.575, lat: -25.264 },
        'uruguay': { lon: -56.165, lat: -34.901 },
        'argentina': { lon: -58.382, lat: -34.604 },
        'chile': { lon: -70.669, lat: -33.448 },
        'jamaica': { lon: -76.794, lat: 18.018 },
        'cuba': { lon: -82.366, lat: 23.114 },
        'dominican republic': { lon: -69.929, lat: 18.487 },
        'haiti': { lon: -72.335, lat: 18.547 },
        'puerto rico': { lon: -66.106, lat: 18.466 },
        'trinidad': { lon: -61.518, lat: 10.654 },
        'bahamas': { lon: -77.345, lat: 25.034 },
        'belize': { lon: -88.768, lat: 17.251 },
        'guatemala': { lon: -90.513, lat: 14.634 },
        'el salvador': { lon: -89.218, lat: 13.692 },
        'honduras': { lon: -87.192, lat: 14.072 },
        'nicaragua': { lon: -86.252, lat: 12.115 },
        'belgium': { lon: 4.352, lat: 50.847 },
        'netherlands': { lon: 4.904, lat: 52.367 },
        'luxembourg': { lon: 6.130, lat: 49.611 },
        'switzerland': { lon: 7.447, lat: 46.948 },
        'austria': { lon: 16.373, lat: 48.208 },
        'denmark': { lon: 12.568, lat: 55.676 },
        'sweden': { lon: 18.069, lat: 59.329 },
        'norway': { lon: 10.752, lat: 59.913 },
        'finland': { lon: 24.941, lat: 60.170 },
        'ireland': { lon: -6.260, lat: 53.350 },
        'portugal': { lon: -9.139, lat: 38.722 },
        'serbia': { lon: 20.448, lat: 44.787 },
        'croatia': { lon: 15.982, lat: 45.815 },
        'bosnia': { lon: 18.413, lat: 43.857 },
        'albania': { lon: 19.819, lat: 41.328 },
        'north macedonia': { lon: 21.434, lat: 41.998 },
        'bulgaria': { lon: 23.322, lat: 42.698 },
        'slovenia': { lon: 14.506, lat: 46.056 },
        'slovakia': { lon: 17.107, lat: 48.149 },
        'lithuania': { lon: 25.280, lat: 54.687 },
        'latvia': { lon: 24.106, lat: 56.946 },
        'estonia': { lon: 24.754, lat: 59.437 },
        'algeria': { lon: 3.087, lat: 36.737 },
        'tunisia': { lon: 10.181, lat: 36.807 },
        'libya': { lon: 13.191, lat: 32.887 },
        'sudan': { lon: 32.560, lat: 15.501 },
        'ethiopia': { lon: 38.757, lat: 8.981 },
        'somalia': { lon: 45.343, lat: 2.046 },
        'tanzania': { lon: 35.742, lat: -6.163 },
        'uganda': { lon: 32.582, lat: 0.347 },
        'rwanda': { lon: 30.061, lat: -1.944 },
        'burundi': { lon: 29.360, lat: -3.383 },
        'zambia': { lon: 28.322, lat: -15.387 },
        'zimbabwe': { lon: 31.053, lat: -17.825 },
        'malawi': { lon: 33.788, lat: -13.963 },
        'mozambique': { lon: 32.573, lat: -25.966 },
        'madagascar': { lon: 47.521, lat: -18.879 },
        'mauritius': { lon: 57.504, lat: -20.166 },
        'seychelles': { lon: 55.451, lat: -4.620 },
        'comoros': { lon: 43.241, lat: -11.717 },
        'angola': { lon: 13.234, lat: -8.838 },
        'namibia': { lon: 17.084, lat: -22.560 },
        'botswana': { lon: 25.913, lat: -24.628 },
        'lesotho': { lon: 27.484, lat: -29.310 },
        'eswatini': { lon: 31.135, lat: -26.317 },
        'cameroon': { lon: 11.519, lat: 3.848 },
        'ghana': { lon: -0.187, lat: 5.604 },
        'ivory coast': { lon: -4.008, lat: 5.345 },
        'liberia': { lon: -10.802, lat: 6.328 },
        'sierra leone': { lon: -13.234, lat: 8.465 },
        'guinea': { lon: -13.578, lat: 9.641 },
        'senegal': { lon: -17.467, lat: 14.716 },
        'mali': { lon: -8.000, lat: 12.639 },
        'niger': { lon: 2.118, lat: 13.512 },
        'burkina faso': { lon: -1.520, lat: 12.371 },
        'chad': { lon: 15.045, lat: 12.107 },
        'central african republic': { lon: 18.555, lat: 4.394 },
        'congo': { lon: 15.283, lat: -4.269 },
        'democratic republic of the congo': { lon: 15.266, lat: -4.325 },
        'gabon': { lon: 9.454, lat: 0.412 },
        'equatorial guinea': { lon: 8.737, lat: 3.752 },
        'sao tome and principe': { lon: 6.613, lat: 0.339 },
        'cape verde': { lon: -23.510, lat: 14.933 },
        'mauritania': { lon: -15.978, lat: 18.079 },
        'western sahara': { lon: -13.203, lat: 27.154 }
    };
    const locationPinAnchorMap = {
        'abu dhabi': { lon: 54.377, lat: 24.454 },
        'accra': { lon: -0.187, lat: 5.603 },
        'addis ababa': { lon: 38.757, lat: 8.981 },
        'adelaide': { lon: 138.601, lat: -34.928 },
        'ahmedabad': { lon: 72.571, lat: 23.022 },
        'algiers': { lon: 3.058, lat: 36.753 },
        'amman': { lon: 35.910, lat: 31.953 },
        'amritsar': { lon: 74.872, lat: 31.634 },
        'anchorage': { lon: -149.900, lat: 61.218 },
        'ankara': { lon: 32.859, lat: 39.933 },
        'antananarivo': { lon: 47.507, lat: -18.879 },
        'asuncion': { lon: -57.634, lat: -25.263 },
        'athens': { lon: 23.727, lat: 37.983 },
        'atlanta': { lon: -84.388, lat: 33.749 },
        'auckland': { lon: 174.764, lat: -36.850 },
        'baghdad': { lon: 44.366, lat: 33.315 },
        'baku': { lon: 49.867, lat: 40.409 },
        'bali': { lon: 115.189, lat: -8.409 },
        'bangalore': { lon: 77.595, lat: 12.972 },
        'bangkok': { lon: 100.502, lat: 13.756 },
        'barcelona': { lon: 2.173, lat: 41.385 },
        'beijing': { lon: 116.407, lat: 39.904 },
        'beirut': { lon: 35.502, lat: 33.893 },
        'belgrade': { lon: 20.457, lat: 44.787 },
        'berlin': { lon: 13.405, lat: 52.520 },
        'birmingham': { lon: -1.891, lat: 52.486 },
        'bogota': { lon: -74.072, lat: 4.711 },
        'boise': { lon: -116.202, lat: 43.615 },
        'boston': { lon: -71.059, lat: 42.360 },
        'brisbane': { lon: 153.025, lat: -27.470 },
        'brussels': { lon: 4.352, lat: 50.847 },
        'bucharest': { lon: 26.102, lat: 44.426 },
        'budapest': { lon: 19.040, lat: 47.498 },
        'buenos aires': { lon: -58.382, lat: -34.604 },
        'busan': { lon: 129.076, lat: 35.179 },
        'cairo': { lon: 31.235, lat: 30.044 },
        'calgary': { lon: -114.071, lat: 51.044 },
        'canberra': { lon: 149.130, lat: -35.281 },
        'cape town': { lon: 18.424, lat: -33.925 },
        'caracas': { lon: -66.903, lat: 10.480 },
        'casablanca': { lon: -7.589, lat: 33.573 },
        'cebu': { lon: 123.886, lat: 10.315 },
        'chennai': { lon: 80.270, lat: 13.083 },
        'chicago': { lon: -87.630, lat: 41.878 },
        'christchurch': { lon: 172.630, lat: -43.532 },
        'cincinnati': { lon: -84.512, lat: 39.103 },
        'cleveland': { lon: -81.694, lat: 41.499 },
        'colombo': { lon: 79.861, lat: 6.927 },
        'copenhagen': { lon: 12.568, lat: 55.676 },
        'dakar': { lon: -17.467, lat: 14.693 },
        'dallas': { lon: -96.797, lat: 32.777 },
        'dar es salaam': { lon: 39.208, lat: -6.792 },
        'darwin': { lon: 130.845, lat: -12.463 },
        'delhi': { lon: 77.209, lat: 28.614 },
        'denver': { lon: -104.991, lat: 39.739 },
        'detroit': { lon: -83.046, lat: 42.331 },
        'dhaka': { lon: 90.412, lat: 23.810 },
        'doha': { lon: 51.531, lat: 25.286 },
        'dubai': { lon: 55.270, lat: 25.204 },
        'dublin': { lon: -6.260, lat: 53.350 },
        'durban': { lon: 31.021, lat: -29.858 },
        'edinburgh': { lon: -3.188, lat: 55.953 },
        'edmonton': { lon: -113.493, lat: 53.546 },
        'fairbanks': { lon: -147.716, lat: 64.837 },
        'florence': { lon: 11.255, lat: 43.770 },
        'fort lauderdale': { lon: -80.137, lat: 26.122 },
        'frankfurt': { lon: 8.683, lat: 50.110 },
        'geneva': { lon: 6.143, lat: 46.204 },
        'guadalajara': { lon: -103.350, lat: 20.659 },
        'guangzhou': { lon: 113.264, lat: 23.129 },
        'halifax': { lon: -63.575, lat: 44.648 },
        'hamburg': { lon: 9.993, lat: 53.551 },
        'hanoi': { lon: 105.834, lat: 21.028 },
        'harare': { lon: 31.053, lat: -17.825 },
        'helsinki': { lon: 24.938, lat: 60.169 },
        'ho chi minh city': { lon: 106.629, lat: 10.823 },
        'hong kong': { lon: 114.169, lat: 22.319 },
        'honolulu': { lon: -157.858, lat: 21.307 },
        'houston': { lon: -95.369, lat: 29.760 },
        'hyderabad': { lon: 78.486, lat: 17.385 },
        'islamabad': { lon: 73.047, lat: 33.684 },
        'istanbul': { lon: 28.978, lat: 41.008 },
        'jaipur': { lon: 75.787, lat: 26.912 },
        'jakarta': { lon: 106.845, lat: -6.208 },
        'jeddah': { lon: 39.237, lat: 21.486 },
        'johannesburg': { lon: 28.047, lat: -26.204 },
        'kabul': { lon: 69.207, lat: 34.555 },
        'kampala': { lon: 32.583, lat: 0.347 },
        'kansas city': { lon: -94.578, lat: 39.100 },
        'karachi': { lon: 67.010, lat: 24.861 },
        'kathmandu': { lon: 85.324, lat: 27.717 },
        'khartoum': { lon: 32.560, lat: 15.500 },
        'kiev': { lon: 30.523, lat: 50.450 },
        'kyiv': { lon: 30.523, lat: 50.450 },
        'kingston': { lon: -76.793, lat: 17.971 },
        'kolkata': { lon: 88.364, lat: 22.572 },
        'lucknow': { lon: 80.946, lat: 26.847 },
        'kuala lumpur': { lon: 101.686, lat: 3.139 },
        'kuwait city': { lon: 47.978, lat: 29.375 },
        'lagos': { lon: 3.379, lat: 6.525 },
        'lahore': { lon: 74.358, lat: 31.520 },
        'la paz': { lon: -68.119, lat: -16.490 },
        'las vegas': { lon: -115.139, lat: 36.170 },
        'lima': { lon: -77.042, lat: -12.046 },
        'lisbon': { lon: -9.139, lat: 38.723 },
        'london': { lon: -0.128, lat: 51.507 },
        'los angeles': { lon: -118.244, lat: 34.052 },
        'luanda': { lon: 13.235, lat: -8.839 },
        'lusaka': { lon: 28.322, lat: -15.388 },
        'madrid': { lon: -3.704, lat: 40.417 },
        'managua': { lon: -86.251, lat: 12.115 },
        'manama': { lon: 50.587, lat: 26.223 },
        'manila': { lon: 120.984, lat: 14.599 },
        'melbourne': { lon: 144.963, lat: -37.814 },
        'memphis': { lon: -90.049, lat: 35.149 },
        'mexico city': { lon: -99.133, lat: 19.433 },
        'miami': { lon: -80.192, lat: 25.761 },
        'milan': { lon: 9.190, lat: 45.464 },
        'minneapolis': { lon: -93.265, lat: 44.978 },
        'minsk': { lon: 27.561, lat: 53.904 },
        'montevideo': { lon: -56.164, lat: -34.901 },
        'montreal': { lon: -73.567, lat: 45.502 },
        'moscow': { lon: 37.617, lat: 55.756 },
        'mumbai': { lon: 72.878, lat: 19.076 },
        'munich': { lon: 11.582, lat: 48.135 },
        'muscat': { lon: 58.406, lat: 23.588 },
        'nairobi': { lon: 36.821, lat: -1.292 },
        'naples': { lon: 14.268, lat: 40.852 },
        'new delhi': { lon: 77.209, lat: 28.614 },
        'new orleans': { lon: -90.072, lat: 29.951 },
        'redmond': { lon: -122.121, lat: 47.673 },
        'seattle': { lon: -122.332, lat: 47.606 },
        'new york city': { lon: -74.006, lat: 40.713 },
        'new york': { lon: -74.006, lat: 40.713 },
        'noumea': { lon: 166.458, lat: -22.276 },
        'novosibirsk': { lon: 82.935, lat: 55.008 },
        'nyc': { lon: -74.006, lat: 40.713 },
        'osaka': { lon: 135.502, lat: 34.694 },
        'oslo': { lon: 10.752, lat: 59.914 },
        'ottawa': { lon: -75.697, lat: 45.421 },
        'panama city': { lon: -79.517, lat: 8.983 },
        'paris': { lon: 2.352, lat: 48.857 },
        'perth': { lon: 115.861, lat: -31.952 },
        'philadelphia': { lon: -75.165, lat: 39.953 },
        'phnom penh': { lon: 104.928, lat: 11.556 },
        'phoenix': { lon: -112.074, lat: 33.448 },
        'pittsburgh': { lon: -79.996, lat: 40.441 },
        'port moresby': { lon: 147.180, lat: -9.443 },
        'portland': { lon: -122.676, lat: 45.523 },
        'porto': { lon: -8.611, lat: 41.149 },
        'port of spain': { lon: -61.519, lat: 10.660 },
        'prague': { lon: 14.438, lat: 50.076 },
        'pretoria': { lon: 28.229, lat: -25.747 },
        'pune': { lon: 73.857, lat: 18.520 },
        'quito': { lon: -78.467, lat: -0.180 },
        'reykjavik': { lon: -21.943, lat: 64.146 },
        'riga': { lon: 24.106, lat: 56.949 },
        'rio de janeiro': { lon: -43.173, lat: -22.906 },
        'riyadh': { lon: 46.675, lat: 24.713 },
        'rome': { lon: 12.496, lat: 41.902 },
        'saigon': { lon: 106.629, lat: 10.823 },
        'salt lake city': { lon: -111.891, lat: 40.761 },
        'san antonio': { lon: -98.494, lat: 29.425 },
        'san diego': { lon: -117.161, lat: 32.715 },
        'san francisco': { lon: -122.419, lat: 37.775 },
        'san jose': { lon: -121.886, lat: 37.338 },
        'san jose costa rica': { lon: -84.091, lat: 9.928 },
        'san juan': { lon: -66.105, lat: 18.466 },
        'santiago': { lon: -70.669, lat: -33.449 },
        'sao paulo': { lon: -46.633, lat: -23.550 },
        'redmond': { lon: -122.121, lat: 47.673 },
        'seattle': { lon: -122.332, lat: 47.606 },
        'seoul': { lon: 126.978, lat: 37.567 },
        'shanghai': { lon: 121.473, lat: 31.230 },
        'shenzhen': { lon: 114.058, lat: 22.543 },
        'singapore': { lon: 103.819, lat: 1.352 },
        'sofia': { lon: 23.322, lat: 42.697 },
        'st louis': { lon: -90.199, lat: 38.627 },
        'st petersburg': { lon: 30.315, lat: 59.939 },
        'stockholm': { lon: 18.069, lat: 59.329 },
        'stuttgart': { lon: 9.182, lat: 48.775 },
        'suva': { lon: 178.450, lat: -18.124 },
        'sydney': { lon: 151.209, lat: -33.869 },
        'taipei': { lon: 121.565, lat: 25.033 },
        'tallinn': { lon: 24.753, lat: 59.437 },
        'tampa': { lon: -82.458, lat: 27.951 },
        'tashkent': { lon: 69.240, lat: 41.299 },
        'tehran': { lon: 51.389, lat: 35.690 },
        'tel aviv': { lon: 34.781, lat: 32.085 },
        'thessaloniki': { lon: 22.944, lat: 40.640 },
        'tijuana': { lon: -117.039, lat: 32.514 },
        'tokyo': { lon: 139.692, lat: 35.690 },
        'toronto': { lon: -79.383, lat: 43.653 },
        'tripoli': { lon: 13.191, lat: 32.887 },
        'tunis': { lon: 10.181, lat: 36.806 },
        'vancouver': { lon: -123.121, lat: 49.283 },
        'vienna': { lon: 16.373, lat: 48.208 },
        'vientiane': { lon: 102.633, lat: 17.975 },
        'vilnius': { lon: 25.280, lat: 54.687 },
        'warsaw': { lon: 21.012, lat: 52.229 },
        'washington': { lon: -77.037, lat: 38.907 },
        'washington dc': { lon: -77.037, lat: 38.907 },
        'wellington': { lon: 174.778, lat: -41.286 },
        'winnipeg': { lon: -97.139, lat: 49.895 },
        'xian': { lon: 108.940, lat: 34.341 },
        'yerevan': { lon: 44.515, lat: 40.188 },
        'yokohama': { lon: 139.639, lat: 35.444 },
        'zagreb': { lon: 15.982, lat: 45.815 },
        'zurich': { lon: 8.541, lat: 47.377 },
        'brisbane': { lon: 153.025, lat: -27.470 }
    };
    // Optional manual percent overrides (left empty: the Miller-projection
    // mapping now handles city placement). Add entries here only to pin an exact
    // spot that the projection cannot resolve.
    const locationPinPercentMap = {};
    // Alternate spellings / historical names that should resolve to a canonical
    // anchor key above, so dropdown options like "New Delhi" or "Bombay" place
    // exactly instead of falling back to a generic timezone point.
    const anchorLabelAliases = {
        'new delhi': 'delhi',
        'bombay': 'mumbai',
        'calcutta': 'kolkata',
        'madras': 'chennai',
        'bengaluru': 'bangalore',
        'peking': 'beijing',
        'saigon': 'ho chi minh city',
        'gothenburg': 'goteborg',
        'st petersburg': 'saint petersburg',
        'nyc': 'new york'
    };
    let mapAspectRatio = 1789 / 970;
    const helperClassTokens = new Set(['c', 'z', 's', 'l', 'm', 'p', 't', 'n', 'country-shape', 'is-hovered']);

    function setCookie(name, value, maxAgeSeconds) {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
    }

    function getCookie(name) {
        const cookiePrefix = `${name}=`;
        const segments = document.cookie ? document.cookie.split(';') : [];

        for (const segment of segments) {
            const trimmed = segment.trim();
            if (trimmed.indexOf(cookiePrefix) !== 0) {
                continue;
            }

            return decodeURIComponent(trimmed.slice(cookiePrefix.length));
        }

        return '';
    }

    function isFiniteNumber(value) {
        return typeof value === 'number' && Number.isFinite(value);
    }

    function normalizePersistedPin(pin) {
        const xPercentRaw = Number(pin && pin.xPercent);
        const yPercentRaw = Number(pin && pin.yPercent);
        const xNormRaw = Number(pin && pin.xNorm);
        const yNormRaw = Number(pin && pin.yNorm);
        const rawCountry = String((pin && pin.country) || 'Unknown country');
        const country = rawCountry.toLowerCase() === 'unknown country' ? 'Ocean' : rawCountry;
        const timezone = String((pin && pin.timezone) || '');
        const persistedIanaTimezone = String((pin && pin.ianaTimezone) || '');
        const isOceanPin = String(country).toLowerCase() === 'ocean';
        const resolvedIanaTimezone = isOceanPin
            ? ''
            : (getIanaTimezoneForOffset(timezone, country) || persistedIanaTimezone);

        const fallbackXNorm = isFiniteNumber(xPercentRaw) ? Math.max(0, Math.min(1, xPercentRaw / 100)) : 0;
        const fallbackYNorm = isFiniteNumber(yPercentRaw) ? Math.max(0, Math.min(1, yPercentRaw / 100)) : 0;
        const normalizedXNorm = isFiniteNumber(xNormRaw) ? Math.max(0, Math.min(1, xNormRaw)) : fallbackXNorm;
        const normalizedYNorm = isFiniteNumber(yNormRaw) ? Math.max(0, Math.min(1, yNormRaw)) : fallbackYNorm;

        return {
            xPercent: Math.max(0, Math.min(100, normalizedXNorm * 100)),
            yPercent: Math.max(0, Math.min(100, normalizedYNorm * 100)),
            xNorm: normalizedXNorm,
            yNorm: normalizedYNorm,
            country: country,
            timezone: timezone,
            ianaTimezone: resolvedIanaTimezone,
            label: String((pin && pin.label) || '')
        };
    }

    function buildPinLabel(country, timezone) {
        const countryText = String(country || 'Unknown country');
        const timezoneText = String(timezone || '').trim();
        return timezoneText ? `${countryText} (${timezoneText})` : countryText;
    }

    function dedupeIndex(values, value) {
        const normalized = String(value || '');
        let index = values.indexOf(normalized);
        if (index === -1) {
            values.push(normalized);
            index = values.length - 1;
        }
        return index;
    }

    function encodeCompactPinsPayload(pinSubset) {
        const countries = [];
        const timezones = [];
        const ianaTimezones = [];
        const quantizedEntries = [];

        pinSubset.forEach(function(pin) {
            const normalizedPin = normalizePersistedPin(pin);
            const xQuantized = Math.round(normalizedPin.xNorm * 8191);
            const yQuantized = Math.round(normalizedPin.yNorm * 8191);
            const countryIndex = dedupeIndex(countries, normalizedPin.country);
            const timezoneIndex = dedupeIndex(timezones, normalizedPin.timezone);
            const ianaIndex = dedupeIndex(ianaTimezones, normalizedPin.ianaTimezone);

            quantizedEntries.push([
                xQuantized.toString(36),
                yQuantized.toString(36),
                countryIndex.toString(36),
                timezoneIndex.toString(36),
                ianaIndex.toString(36)
            ].join('.'));
        });

        return JSON.stringify({
            v: 2,
            c: countries,
            t: timezones,
            i: ianaTimezones,
            p: quantizedEntries.join(';')
        });
    }

    function decodeCompactPinsPayload(payload) {
        if (!payload || !Array.isArray(payload.c) || !Array.isArray(payload.t) || !Array.isArray(payload.i)) {
            return [];
        }

        const packed = typeof payload.p === 'string' && payload.p
            ? payload.p.split(';')
            : [];
        const decodedPins = [];

        packed.forEach(function(entry) {
            const parts = String(entry || '').split('.');
            if (parts.length < 5) {
                return;
            }

            const xQuantized = Number.parseInt(parts[0], 36);
            const yQuantized = Number.parseInt(parts[1], 36);
            const countryIndex = Number.parseInt(parts[2], 36);
            const timezoneIndex = Number.parseInt(parts[3], 36);
            const ianaIndex = Number.parseInt(parts[4], 36);

            if (!Number.isFinite(xQuantized) || !Number.isFinite(yQuantized)) {
                return;
            }

            const xNorm = Math.max(0, Math.min(1, xQuantized / 8191));
            const yNorm = Math.max(0, Math.min(1, yQuantized / 8191));
            const country = payload.c[countryIndex] || 'Unknown country';
            const timezone = payload.t[timezoneIndex] || '';
            const ianaTimezone = payload.i[ianaIndex] || '';

            decodedPins.push({
                xPercent: xNorm * 100,
                yPercent: yNorm * 100,
                xNorm: xNorm,
                yNorm: yNorm,
                country: String(country),
                timezone: String(timezone),
                ianaTimezone: String(ianaTimezone),
                label: buildPinLabel(country, timezone)
            });
        });

        return decodedPins;
    }

    function writeCookieIfFits(name, value, maxAgeSeconds) {
        if (encodeURIComponent(value).length > persistCookiePinsMaxBytes) {
            return false;
        }

        setCookie(name, value, maxAgeSeconds);
        return getCookie(name) === value;
    }

    function findMaxPersistablePinCount() {
        if (!pins.length) {
            return 0;
        }

        let low = 0;
        let high = pins.length;
        let best = 0;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const subset = pins.slice(Math.max(0, pins.length - mid));
            const candidatePayload = encodeCompactPinsPayload(subset);
            const canWrite = writeCookieIfFits(persistCookiePins, candidatePayload, persistCookieMaxAgeSeconds);

            if (canWrite) {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return best;
    }

    function persistPinsToCookie() {
        try {
            const keepCount = findMaxPersistablePinCount();
            const subset = pins.slice(Math.max(0, pins.length - keepCount));
            const payload = encodeCompactPinsPayload(subset);
            writeCookieIfFits(persistCookiePins, payload, persistCookieMaxAgeSeconds);
        } catch (error) {
            // Swallow persistence failures so the UI behavior is unchanged.
        }
    }

    function persistChipTimezoneToCookie() {
        const selected = String(chipSelectedTimezone || '').trim();
        if (!selected) {
            return;
        }

        setCookie(persistCookieChipTimezone, selected, persistCookieMaxAgeSeconds);
    }

    function restorePinsFromCookie() {
        const rawValue = getCookie(persistCookiePins);
        if (!rawValue) {
            return;
        }

        try {
            const parsed = JSON.parse(rawValue);
            const restoredPins = Array.isArray(parsed)
                ? parsed.map(normalizePersistedPin)
                : (parsed && parsed.v === 2 ? decodeCompactPinsPayload(parsed).map(normalizePersistedPin) : []);

            if (!restoredPins.length) {
                return;
            }

            pins.length = 0;
            restoredPins.forEach(function(normalizedPin) {
                pins.push(normalizedPin);
            });

            if (pins.length) {
                const lastPin = pins[pins.length - 1];
                selectedCountry = lastPin.country;
                selectedTimezone = lastPin.timezone;
            }
        } catch (error) {
            // Ignore invalid cookie content and continue normal app behavior.
        }
    }

    function restoreChipTimezoneFromCookie() {
        const rawTimezone = String(getCookie(persistCookieChipTimezone) || '').trim();
        if (!rawTimezone) {
            return;
        }

        // Defer resolution until timezone lookup/options are initialized.
        chipSelectedTimezone = rawTimezone;
    }

    function restorePersistedState() {
        restoreChipTimezoneFromCookie();
        restorePinsFromCookie();
        restoreThemeFromCookie();
    }

    function persistThemeToCookie() {
        setCookie(persistCookieTheme, currentTheme, persistCookieMaxAgeSeconds);
    }

    function restoreThemeFromCookie() {
        const savedTheme = String(getCookie(persistCookieTheme) || '').trim();
        if (savedTheme && themeMap[savedTheme]) {
            currentTheme = savedTheme;
        } else {
            currentTheme = 'modern'; // Default to Modern if no cookie
        }
        updateThemeUI();
    }

    function updateThemeUI() {
        if (themeDropdown) {
            themeDropdown.querySelectorAll('.theme-option').forEach(function(option) {
                const theme = option.getAttribute('data-theme');
                option.classList.toggle('is-selected', theme === currentTheme);
            });
        }
        // Toggle theme class on map-container for theme-specific CSS
        if (mapContainer) {
            mapContainer.classList.toggle('theme-modern', currentTheme === 'modern');
        }
    }

    function applyTheme(themeName) {
        if (!themeMap[themeName]) {
            return;
        }

        currentTheme = themeName;
        persistThemeToCookie();
        updateThemeUI();
        
        // Reload the map with the new theme's SVG
        loadMap();
    }

    function parseSliderOffsetMinutes() {
        return sliderOffsetMinutes;
    }

    function getSliderStepMinutes() {
        return sliderMinuteStep;
    }

    function clampSliderOffsetMinutes(value) {
        const boundedValue = Math.max(-sliderMinuteRange, Math.min(sliderMinuteRange, value));
        return Math.round(boundedValue / sliderMinuteStep) * sliderMinuteStep;
    }

    function setSliderOffsetMinutes(value) {
        sliderOffsetMinutes = clampSliderOffsetMinutes(value);
        if (sliderDaySegments) {
            sliderDaySegments.setAttribute('aria-valuenow', String(sliderOffsetMinutes));
        }
    }

    function getSliderTargetDate() {
        const offsetMinutes = parseSliderOffsetMinutes();
        return new Date(sliderReferenceDate.getTime() + offsetMinutes * 60000);
    }

    function getLiveSliderOffsetMinutes(nowDate) {
        const currentDate = nowDate || new Date();
        const offsetMinutes = (currentDate.getTime() - sliderReferenceDate.getTime()) / 60000;
        return clampSliderOffsetMinutes(offsetMinutes);
    }

    function shiftTimelineWindow(deltaMinutes) {
        if (!deltaMinutes) {
            return;
        }

        const anchorDate = isClockPaused && pausedClockDate
            ? new Date(pausedClockDate.getTime())
            : getClockNow();

        sliderReferenceDate = new Date(sliderReferenceDate.getTime() + deltaMinutes * 60000);
        const anchoredOffsetMinutes = (anchorDate.getTime() - sliderReferenceDate.getTime()) / 60000;
        setSliderOffsetMinutes(anchoredOffsetMinutes);

        if (isClockPaused) {
            pausedClockDate = anchorDate;
        }

        initializeStaticTimelineDayBlocks(sliderReferenceDate);
        updateSliderDatetimeLabel();
        updatePinTimes();
    }

    function formatDateForDatetimeInput(dateValue) {
        const date = dateValue || new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function toDateKey(dateValue) {
        const year = dateValue.getFullYear();
        const month = String(dateValue.getMonth() + 1).padStart(2, '0');
        const day = String(dateValue.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function parseDateKey(dateKey) {
        const match = String(dateKey || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
            return null;
        }

        const year = Number.parseInt(match[1], 10);
        const month = Number.parseInt(match[2], 10);
        const day = Number.parseInt(match[3], 10);
        const parsedDate = new Date(year, month - 1, day);

        if (
            parsedDate.getFullYear() !== year ||
            parsedDate.getMonth() !== month - 1 ||
            parsedDate.getDate() !== day
        ) {
            return null;
        }

        return parsedDate;
    }

    function sameCalendarDate(leftDate, rightDate) {
        return leftDate.getFullYear() === rightDate.getFullYear()
            && leftDate.getMonth() === rightDate.getMonth()
            && leftDate.getDate() === rightDate.getDate();
    }

    function syncPickerTimeInputs() {
        if (!chipPickerSelectedDate) {
            return;
        }

        if (chipDatetimeHourInput) {
            chipDatetimeHourInput.value = String(chipPickerSelectedDate.getHours()).padStart(2, '0');
        }

        if (chipDatetimeMinuteInput) {
            chipDatetimeMinuteInput.value = String(chipPickerSelectedDate.getMinutes()).padStart(2, '0');
        }

        if (chipDatetimeSecondInput) {
            chipDatetimeSecondInput.value = String(chipPickerSelectedDate.getSeconds()).padStart(2, '0');
        }
    }

    function applyPickerTimeInputs() {
        if (!chipPickerSelectedDate) {
            return;
        }

        const hourValue = chipDatetimeHourInput ? Number.parseInt(chipDatetimeHourInput.value, 10) : chipPickerSelectedDate.getHours();
        const minuteValue = chipDatetimeMinuteInput ? Number.parseInt(chipDatetimeMinuteInput.value, 10) : chipPickerSelectedDate.getMinutes();
        const secondValue = chipDatetimeSecondInput ? Number.parseInt(chipDatetimeSecondInput.value, 10) : chipPickerSelectedDate.getSeconds();
        const nextHours = Number.isFinite(hourValue) ? Math.max(0, Math.min(23, hourValue)) : chipPickerSelectedDate.getHours();
        const nextMinutes = Number.isFinite(minuteValue) ? Math.max(0, Math.min(59, minuteValue)) : chipPickerSelectedDate.getMinutes();
        const nextSeconds = Number.isFinite(secondValue) ? Math.max(0, Math.min(59, secondValue)) : chipPickerSelectedDate.getSeconds();

        chipPickerSelectedDate.setHours(nextHours, nextMinutes, nextSeconds, 0);

        if (chipDatetimeHourInput) {
            chipDatetimeHourInput.value = String(nextHours).padStart(2, '0');
        }

        if (chipDatetimeMinuteInput) {
            chipDatetimeMinuteInput.value = String(nextMinutes).padStart(2, '0');
        }

        if (chipDatetimeSecondInput) {
            chipDatetimeSecondInput.value = String(nextSeconds).padStart(2, '0');
        }
    }

    function normalizeTimeInputField(inputElement, maxValue) {
        if (!inputElement) {
            return;
        }

        const digitsOnly = String(inputElement.value || '').replace(/\D/g, '').slice(0, 2);
        if (!digitsOnly) {
            inputElement.value = '';
            return;
        }

        const parsedValue = Number.parseInt(digitsOnly, 10);
        const clampedValue = Number.isFinite(parsedValue)
            ? Math.max(0, Math.min(maxValue, parsedValue))
            : 0;

        inputElement.value = String(clampedValue).padStart(2, '0');
    }

    function sanitizeTimeInputField(inputElement) {
        if (!inputElement) {
            return;
        }

        inputElement.value = String(inputElement.value || '').replace(/\D/g, '').slice(0, 2);
    }

    function wireTimeInputBehavior(inputElement, maxValue) {
        if (!inputElement) {
            return;
        }

        inputElement.addEventListener('focus', function() {
            inputElement.select();
        });

        inputElement.addEventListener('mouseup', function(event) {
            // Keep full selection after focus so users can immediately type both digits.
            event.preventDefault();
        });

        inputElement.addEventListener('input', function() {
            sanitizeTimeInputField(inputElement);
        });

        inputElement.addEventListener('blur', function() {
            normalizeTimeInputField(inputElement, maxValue);
            applyPickerTimeInputs();
        });
    }

    function stepPickerTimePart(part, delta) {
        if (!chipPickerSelectedDate || !delta) {
            return;
        }

        if (part === 'hour') {
            chipPickerSelectedDate.setHours(chipPickerSelectedDate.getHours() + delta);
        } else if (part === 'minute') {
            chipPickerSelectedDate.setMinutes(chipPickerSelectedDate.getMinutes() + delta);
        } else if (part === 'second') {
            chipPickerSelectedDate.setSeconds(chipPickerSelectedDate.getSeconds() + delta);
        }

        syncPickerTimeInputs();
    }

    function renderChipDatetimePicker() {
        if (!chipEditPanel || !chipDatetimeDayGrid || !chipDatetimeMonthLabel || !chipPickerDisplayMonth || !chipPickerSelectedDate) {
            return;
        }

        chipDatetimeMonthLabel.textContent = chipPickerDisplayMonth.toLocaleDateString([], {
            month: 'long',
            year: 'numeric'
        });

        const monthStart = new Date(chipPickerDisplayMonth.getFullYear(), chipPickerDisplayMonth.getMonth(), 1);
        const gridStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - monthStart.getDay());
        const today = new Date();
        const dayButtons = [];

        for (let index = 0; index < 42; index += 1) {
            const dayDate = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
            const inCurrentMonth = dayDate.getMonth() === chipPickerDisplayMonth.getMonth();
            const isSelected = sameCalendarDate(dayDate, chipPickerSelectedDate);
            const isToday = sameCalendarDate(dayDate, today);
            const classes = [
                'chip-datetime-day',
                inCurrentMonth ? 'is-current-month' : 'is-outside-month',
                isSelected ? 'is-selected' : '',
                isToday ? 'is-today' : ''
            ].filter(Boolean).join(' ');

            dayButtons.push(`<button type="button" class="${classes}" data-date="${toDateKey(dayDate)}" aria-label="${dayDate.toDateString()}">${dayDate.getDate()}</button>`);
        }

        chipDatetimeDayGrid.innerHTML = dayButtons.join('');
        syncPickerTimeInputs();
    }

    function initializeDatetimeInput() {
        chipPickerSelectedDate = null;
        chipPickerDisplayMonth = null;
        rebuildChipTimezoneOptions();
        if (!setChipTimezone(chipSelectedTimezone || browserResolvedTimezone)) {
            setChipTimezone(browserResolvedTimezone);
        }
    }

    function getAvailableIanaTimezones() {
        let zones = [];

        try {
            if (Intl.supportedValuesOf) {
                zones = Intl.supportedValuesOf('timeZone') || [];
            }
        } catch (e) {
            zones = [];
        }

        if (!zones.length) {
            const fallbackZones = new Set(Object.keys(ianaTimezoneAbbreviations));
            Object.keys(utcOffsetToTimezones).forEach(function(offset) {
                (utcOffsetToTimezones[offset] || []).forEach(function(zone) {
                    if (zone && zone.includes('/')) {
                        fallbackZones.add(zone);
                    }
                });
            });
            zones = Array.from(fallbackZones);
        }

        const zoneSet = new Set(zones.filter(Boolean));
        zoneSet.add(browserResolvedTimezone);
        zoneSet.add('UTC');

        return Array.from(zoneSet).sort();
    }

    function normalizeTimezoneSearchToken(value) {
        return String(value || '')
            .trim()
            .toLowerCase()
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ');
    }

    function formatTimezoneToken(token) {
        return String(token || '').replace(/_/g, ' ').trim();
    }

    function rebuildChipTimezoneOptions() {
        chipTimezoneLookup.clear();

        // Seed lookup with all browser-supported IANA zones so direct zone
        // names (e.g. "Asia/Kolkata") typed by power users always resolve.
        const ianaZones = getAvailableIanaTimezones();
        ianaZones.forEach(function(zone) {
            // Store under normalised key: lower-case, underscores→spaces.
            const key = normalizeTimezoneSearchToken(zone);
            if (key && !chipTimezoneLookup.has(key)) {
                chipTimezoneLookup.set(key, zone);
            }
            // Also store the raw zone string as-is for direct lookup.
            chipTimezoneLookup.set(zone, zone);
        });

        // Alias entries override with city-name → IANA mappings and are the
        // main entries shown in the dropdown, but we now also add all countries.
        chipTimezoneAllOptions = [];
        const seenLabels = new Set();

        // 1. Add all alias entries (cities, major countries)
        chipTimezoneAliasEntries.forEach(function(entry) {
            const aliasName = entry[0];
            const zone = entry[1];
            if (!aliasName || !zone) {
                return;
            }
            chipTimezoneLookup.set(normalizeTimezoneSearchToken(aliasName), zone);
            chipTimezoneLookup.set(aliasName, zone);
            chipTimezoneLookup.set(aliasName.toLowerCase(), zone);
            if (!seenLabels.has(aliasName)) {
                seenLabels.add(aliasName);
                chipTimezoneAllOptions.push(aliasName);
            }
        });

        // 2. Add all countries from countryCodeFallback (if not already present)
        countryCodeFallback.forEach(function(countryName, code) {
            if (!countryName || seenLabels.has(countryName)) {
                return;
            }
            // Try to find a best-guess IANA timezone for the country
            // Use the first matching zone from utcOffsetToTimezones, fallback to 'UTC'
            let bestZone = countryCodePrimaryTimezone.get(code) || null;
            for (const offset in utcOffsetToTimezones) {
                if (bestZone) break;
                const zones = utcOffsetToTimezones[offset];
                if (zones && zones.length) {
                    for (const zone of zones) {
                        if (zone && zone.toLowerCase().includes(code)) {
                            bestZone = zone;
                            break;
                        }
                    }
                }
                if (bestZone) break;
            }
            // If not found by code, try by country name
            if (!bestZone) {
                for (const offset in utcOffsetToTimezones) {
                    const zones = utcOffsetToTimezones[offset];
                    if (zones && zones.length) {
                        for (const zone of zones) {
                            if (zone && zone.toLowerCase().includes(countryName.toLowerCase().replace(/\s/g, ''))) {
                                bestZone = zone;
                                break;
                            }
                        }
                    }
                    if (bestZone) break;
                }
            }
            // Fallback to UTC if no match
            if (!bestZone) bestZone = 'UTC';
            chipTimezoneLookup.set(normalizeTimezoneSearchToken(countryName), bestZone);
            chipTimezoneLookup.set(countryName, bestZone);
            chipTimezoneLookup.set(countryName.toLowerCase(), bestZone);
            seenLabels.add(countryName);
            chipTimezoneAllOptions.push(countryName);
        });

        // 3. Explicitly add missing regions that are not in countryCodeFallback
        const explicitRegionEntries = [
            ['Azores', 'Atlantic/Azores'],
            ['Cape Verde', 'Atlantic/Cape_Verde'],
            ['Faroe Islands', 'Atlantic/Faroe'],
            ['Greenland', 'America/Godthab'],
            ['Svalbard and Jan Mayen', 'Arctic/Longyearbyen'],
            ['Reunion', 'Indian/Reunion'],
            ['Mayotte', 'Indian/Mayotte'],
            ['Comoros', 'Indian/Comoro'],
            ['Seychelles', 'Indian/Mahe'],
            ['Madeira', 'Atlantic/Madeira'],
            ['Canary Islands', 'Atlantic/Canary'],
            ['Guadeloupe', 'America/Guadeloupe'],
            ['Martinique', 'America/Martinique'],
            ['Saint Pierre and Miquelon', 'America/Miquelon'],
            ['French Guiana', 'America/Cayenne'],
            ['New Caledonia', 'Pacific/Noumea'],
            ['Wallis and Futuna', 'Pacific/Wallis'],
            ['French Polynesia', 'Pacific/Tahiti'],
            ['Tokelau', 'Pacific/Fakaofo'],
            ['Niue', 'Pacific/Niue'],
            ['Cook Islands', 'Pacific/Rarotonga'],
            ['Pitcairn', 'Pacific/Pitcairn'],
            ['Bouvet Island', 'Atlantic/South_Georgia'],
            ['Heard Island and McDonald Islands', 'Indian/Kerguelen'],
            ['Antarctica', 'Antarctica/McMurdo']
        ];
        explicitRegionEntries.forEach(function(entry) {
            const region = entry[0];
            const zone = entry[1];
            if (!region || !zone || seenLabels.has(region)) {
                return;
            }
            chipTimezoneLookup.set(normalizeTimezoneSearchToken(region), zone);
            chipTimezoneLookup.set(region, zone);
            chipTimezoneLookup.set(region.toLowerCase(), zone);
            seenLabels.add(region);
            chipTimezoneAllOptions.push(region);
        });

        chipTimezoneAllOptions.sort((a, b) => a.localeCompare(b));
        updateChipTimezoneDropdown();
    }

    function updateChipTimezoneDropdown() {
        const searchText = chipTimezoneInput.value.toLowerCase();
        const filtered = chipTimezoneAllOptions.filter(function(option) {
            return option.toLowerCase().includes(searchText) || searchText === '';
        });

        chipTimezoneList.innerHTML = filtered.map(function(label) {
            const resolvedZone = chipTimezoneLookup.get(label) || label;
            const isSelected = resolvedZone === chipSelectedTimezone;
            return `<div class="chip-timezone-option${isSelected ? ' is-selected' : ''}" data-timezone="${resolvedZone}">${label}</div>`;
        }).join('');
    }

    function isValidIanaZone(zone) {
        try {
            Intl.DateTimeFormat(undefined, { timeZone: zone });
            return true;
        } catch (e) {
            return false;
        }
    }

    function resolveTimezoneSelection(rawValue) {
        const value = String(rawValue || '').trim();
        if (!value) {
            return '';
        }

        // 1. Direct exact match in lookup (handles IANA zone strings and
        //    alias names that were stored verbatim).
        if (chipTimezoneLookup.has(value)) {
            return chipTimezoneLookup.get(value);
        }

        // 2. Case-insensitive alias name match.
        const lower = value.toLowerCase();
        if (chipTimezoneLookup.has(lower)) {
            return chipTimezoneLookup.get(lower);
        }

        // 3. Normalised token match (underscores/dashes → spaces, lower-case).
        const normalKey = normalizeTimezoneSearchToken(value);
        if (chipTimezoneLookup.has(normalKey)) {
            return chipTimezoneLookup.get(normalKey);
        }

        // 4. Legacy: option values that appended " - IANA/Zone" at the end.
        const dashMatch = value.match(/\s-\s([A-Za-z_][A-Za-z0-9_/+-]+)$/);
        if (dashMatch) {
            const candidate = dashMatch[1];
            if (chipTimezoneLookup.has(candidate)) {
                return chipTimezoneLookup.get(candidate);
            }
            const candidateKey = normalizeTimezoneSearchToken(candidate);
            if (chipTimezoneLookup.has(candidateKey)) {
                return chipTimezoneLookup.get(candidateKey);
            }
        }

        // 5. Last resort: validate directly with Intl so power users can type
        //    any IANA zone name even if it's not in our lookup.
        if (value.includes('/') && isValidIanaZone(value)) {
            return value;
        }

        return '';
    }

    function getDatePartsInTimezone(dateValue, timezone) {
        if (!timezone) {
            return null;
        }

        try {
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const parts = formatter.formatToParts(dateValue);
            const get = function(type) {
                const part = parts.find(function(p) { return p.type === type; });
                return part ? Number.parseInt(part.value, 10) : 0;
            };

            return {
                year: get('year'),
                month: get('month'),
                day: get('day'),
                hour: get('hour'),
                minute: get('minute'),
                second: get('second')
            };
        } catch (e) {
            return null;
        }
    }

    function buildDateFromTimezoneParts(parts, timezone) {
        if (!parts || !timezone) {
            return null;
        }

        const utcGuessMs = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second || 0);
        let date = new Date(utcGuessMs);
        let offset = getTimezoneOffsetMs(timezone, date);
        date = new Date(utcGuessMs - offset);

        // A second pass helps around DST transitions.
        const correctedOffset = getTimezoneOffsetMs(timezone, date);
        if (correctedOffset !== offset) {
            date = new Date(utcGuessMs - correctedOffset);
        }

        return date;
    }

    function updateChipTimezoneInput() {
        if (chipTimezoneInput) {
            chipTimezoneInput.value = chipSelectedTimezone || '';
        }
    }

    function updateChipTimezoneDisplay() {
        if (chipTimezoneDisplay) {
            if (chipSelectedTimezone) {
                chipTimezoneDisplay.textContent = 'Timezone: ' + chipSelectedTimezone;
                chipTimezoneDisplay.style.display = 'block';
            } else {
                chipTimezoneDisplay.textContent = '';
                chipTimezoneDisplay.style.display = 'none';
            }
        }
    }

    function getChipTimezoneShiftMinutes(dateValue) {
        if (!dateValue || Number.isNaN(dateValue.getTime())) {
            return 0;
        }

        const selectedTimezone = chipSelectedTimezone || browserResolvedTimezone;
        if (!selectedTimezone || selectedTimezone === browserResolvedTimezone) {
            return 0;
        }

        const selectedOffset = getTimezoneOffsetMs(selectedTimezone, dateValue);
        const browserOffset = getTimezoneOffsetMs(browserResolvedTimezone, dateValue);
        return Math.round((selectedOffset - browserOffset) / 60000);
    }

    function resolveBaseOffsetFromVisualOffset(visualOffsetMinutes) {
        const clampedVisualOffset = clampSliderOffsetMinutes(visualOffsetMinutes);
        let baseOffset = clampedVisualOffset;

        // Iterate a few times because timezone shift can vary across DST boundaries.
        for (let i = 0; i < 3; i += 1) {
            const candidateDate = new Date(sliderReferenceDate.getTime() + baseOffset * 60000);
            const shiftMinutes = getChipTimezoneShiftMinutes(candidateDate);
            baseOffset = clampSliderOffsetMinutes(clampedVisualOffset - shiftMinutes);
        }

        return baseOffset;
    }

    function setChipTimezone(timezone, options) {
        const resolved = resolveTimezoneSelection(timezone);
        if (!resolved) {
            return false;
        }

        const rawSelectionLabel = options && typeof options.selectedLabel === 'string'
            ? options.selectedLabel.trim()
            : '';
        const hasExplicitLabel = Boolean(rawSelectionLabel && rawSelectionLabel !== resolved);
        const timezoneChanged = chipSelectedTimezone !== resolved;

        if (hasExplicitLabel) {
            chipSelectedLocationLabel = rawSelectionLabel;
        } else if (timezoneChanged) {
            chipSelectedLocationLabel = '';
        }

        chipSelectedTimezone = resolved;
        updateChipTimezoneInput();
        updateChipTimezoneDisplay();
        persistChipTimezoneToCookie();

        if (options && options.rerenderPicker && chipPickerSelectedDate) {
            const activeDate = isClockPaused && pausedClockDate
                ? new Date(pausedClockDate.getTime())
                : getClockNow();
            const timezoneParts = getDatePartsInTimezone(activeDate, chipSelectedTimezone);
            if (timezoneParts) {
                chipPickerSelectedDate = new Date(
                    timezoneParts.year,
                    timezoneParts.month - 1,
                    timezoneParts.day,
                    timezoneParts.hour,
                    timezoneParts.minute,
                    timezoneParts.second,
                    0
                );
            }
            chipPickerDisplayMonth = new Date(chipPickerSelectedDate.getFullYear(), chipPickerSelectedDate.getMonth(), 1);
            renderChipDatetimePicker();
        }

        updateSliderDatetimeLabel();
        return true;
    }

    function setTimelineFromDate(targetDate) {
        if (!targetDate || Number.isNaN(targetDate.getTime())) {
            return;
        }

        // Calculate the offset from the current reference date
        const offsetMinutes = (targetDate.getTime() - sliderReferenceDate.getTime()) / 60000;
        
        // Check if the target date is outside the valid range
        if (Math.abs(offsetMinutes) > sliderMinuteRange) {
            // Shift the reference date to bring the target date within range
            // Set it so the target date is at the center of the timeline (offset = 0)
            sliderReferenceDate = new Date(targetDate.getTime());
            setSliderOffsetMinutes(0);
            
            // Update the timeline visuals
            initializeStaticTimelineDayBlocks(sliderReferenceDate);
            updateSliderDatetimeLabel();
            updatePinTimes();
        } else {
            // Target date is within the current range, just update the offset
            const targetOffset = clampSliderOffsetMinutes(offsetMinutes);
            setSliderOffsetMinutes(targetOffset);
        }
        
        setClockPaused(true, getSliderTargetDate());
    }

    function openChipEditPanel() {
        if (!chipEditPanel || !chipEditToggleButton) {
            return;
        }

        const activeDate = isClockPaused && pausedClockDate
            ? new Date(pausedClockDate.getTime())
            : getClockNow();

        const timezoneParts = getDatePartsInTimezone(activeDate, chipSelectedTimezone);
        if (timezoneParts) {
            chipPickerSelectedDate = new Date(
                timezoneParts.year,
                timezoneParts.month - 1,
                timezoneParts.day,
                timezoneParts.hour,
                timezoneParts.minute,
                timezoneParts.second,
                0
            );
            chipPickerDisplayMonth = new Date(timezoneParts.year, timezoneParts.month - 1, 1);
        } else {
            chipPickerSelectedDate = new Date(activeDate.getTime());
            chipPickerDisplayMonth = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
        }

        updateChipTimezoneInput();
        renderChipDatetimePicker();

        if (chipDatetimeHourInput) {
            chipDatetimeHourInput.focus();
            chipDatetimeHourInput.select();
        }

        chipEditPanel.hidden = false;
        chipEditToggleButton.setAttribute('aria-expanded', 'true');
    }

    function closeChipEditPanel() {
        if (!chipEditPanel || !chipEditToggleButton) {
            return;
        }

        chipEditPanel.hidden = true;
        chipEditToggleButton.setAttribute('aria-expanded', 'false');
    }

    function toggleChipEditPanel() {
        if (!chipEditPanel) {
            return;
        }

        if (chipEditPanel.hidden) {
            openChipEditPanel();
        } else {
            closeChipEditPanel();
        }
    }

    function applyChipDatetimeInput() {
        if (!chipPickerSelectedDate) {
            return;
        }

        applyPickerTimeInputs();
        const timezoneDate = buildDateFromTimezoneParts({
            year: chipPickerSelectedDate.getFullYear(),
            month: chipPickerSelectedDate.getMonth() + 1,
            day: chipPickerSelectedDate.getDate(),
            hour: chipPickerSelectedDate.getHours(),
            minute: chipPickerSelectedDate.getMinutes(),
            second: chipPickerSelectedDate.getSeconds()
        }, chipSelectedTimezone);

        setTimelineFromDate(timezoneDate || new Date(chipPickerSelectedDate.getTime()));
        closeChipEditPanel();
    }

    function updateSliderSegmentationScale() {
        const totalMinutes = sliderMinuteRange * 2;
        const dayStepPercent = (1440 / totalMinutes) * 100;
        const sliderWrap = sliderDaySegments && sliderDaySegments.closest('.time-slider-wrap');
        if (sliderWrap) {
            sliderWrap.style.setProperty('--day-step-pct', `${dayStepPercent}%`);
        }
    }

    function formatSliderDatetime(dateValue) {
        const date = dateValue || new Date();
        return date.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    function formatDayLabel(dateValue) {
        return dateValue.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function initializeStaticTimelineDayBlocks(referenceDate) {
        if (!sliderDaySegments) {
            return;
        }

        const minValue = -sliderMinuteRange;
        const maxValue = sliderMinuteRange;

        const baseDate = referenceDate || new Date();
        const rangeStart = new Date(baseDate.getTime() + minValue * 60000);
        const rangeEnd = new Date(baseDate.getTime() + maxValue * 60000);
        const totalMinutes = maxValue - minValue;
        const activeTime = isClockPaused && pausedClockDate ? pausedClockDate.getTime() : baseDate.getTime();

        const segmentStart = new Date(rangeStart);
        segmentStart.setHours(0, 0, 0, 0);

        const daySegments = [];
        let cursor = new Date(segmentStart);

        while (cursor < rangeEnd) {
            const next = new Date(cursor);
            next.setDate(next.getDate() + 1);

            const visibleStartMs = Math.max(cursor.getTime(), rangeStart.getTime());
            const visibleEndMs = Math.min(next.getTime(), rangeEnd.getTime());

            if (visibleEndMs > visibleStartMs) {
                const startOffsetMinutes = (visibleStartMs - baseDate.getTime()) / 60000;
                const endOffsetMinutes = (visibleEndMs - baseDate.getTime()) / 60000;
                const widthPercent = ((endOffsetMinutes - startOffsetMinutes) / totalMinutes) * 100;
                const isCurrentDay = activeTime >= cursor.getTime() && activeTime < next.getTime();
                const hasMidnightStart = visibleStartMs === cursor.getTime();

                // Calculate noon position as % within this segment's visible portion
                const noonMs = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), 12, 0, 0, 0).getTime();
                let noonPercent = null;
                if (noonMs > visibleStartMs && noonMs < visibleEndMs) {
                    noonPercent = ((noonMs - visibleStartMs) / (visibleEndMs - visibleStartMs)) * 100;
                }

                daySegments.push({
                    label: formatDayLabel(cursor),
                    widthPercent: widthPercent,
                    isCurrentDay: isCurrentDay,
                    hasMidnightStart: hasMidnightStart,
                    noonPercent: noonPercent
                });
            }

            cursor = next;
        }

        if (!daySegments.length) {
            sliderDaySegments.innerHTML = '';
            return;
        }

        sliderDaySegments.innerHTML = daySegments.map(function(segment) {
            const width = Math.max(0.5, segment.widthPercent);
            const noonTick = segment.noonPercent !== null
                ? `<span class="slider-noon-tick" style="left:${segment.noonPercent.toFixed(2)}%" aria-hidden="true"><span class="slider-half-day-label">12pm</span></span>`
                : '';
            return `<span class="slider-day-block${segment.isCurrentDay ? ' is-current-day' : ''}" style="width:${width}%;"><span class="slider-day-label">${segment.label}</span>${segment.hasMidnightStart ? '<span class="slider-midnight-tick" aria-hidden="true"><span class="slider-half-day-label">12am</span></span>' : ''}${noonTick}</span>`;
        }).join('');
    }

    function updateTimelineChipAndLabels() {
        const minValue = -sliderMinuteRange;
        const maxValue = sliderMinuteRange;
        const sliderValue = parseSliderOffsetMinutes();
        const targetDate = isClockPaused && pausedClockDate
            ? new Date(pausedClockDate.getTime())
            : getClockNow();
        const displayTimezone = chipSelectedTimezone || browserResolvedTimezone;
        const timezoneShiftMinutes = getChipTimezoneShiftMinutes(targetDate);

        if (sliderLiveTime) {
            try {
                sliderLiveTime.textContent = targetDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: displayTimezone
                });
            } catch (e) {
                sliderLiveTime.textContent = targetDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            }
        }

        if (sliderLiveDate) {
            try {
                sliderLiveDate.textContent = targetDate.toLocaleDateString([], {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    timeZone: displayTimezone
                });
            } catch (e) {
                sliderLiveDate.textContent = targetDate.toLocaleDateString([], {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
            }
        }

        if (sliderLiveChip && !Number.isNaN(minValue) && !Number.isNaN(maxValue) && maxValue > minValue) {
            const shiftedSliderValue = clampSliderOffsetMinutes(sliderValue + timezoneShiftMinutes);
            const percent = ((shiftedSliderValue - minValue) / (maxValue - minValue)) * 100;
            sliderLiveChip.style.left = `${Math.max(0, Math.min(100, percent))}%`;
        }
    }

    function updateSliderDatetimeLabel() {
        if (!sliderDatetime) {
            updateTimelineChipAndLabels();
            return;
        }

        const offsetMinutes = parseSliderOffsetMinutes();
        const relation = offsetMinutes === 0
            ? 'Now'
            : (offsetMinutes < 0 ? `${Math.abs(offsetMinutes)} min past` : `${offsetMinutes} min future`);
        sliderDatetime.textContent = relation;
        updateTimelineChipAndLabels();
    }

    function resetDatetimeSliderToNow() {
        sliderReferenceDate = new Date();
        setSliderOffsetMinutes(0);
        initializeStaticTimelineDayBlocks(sliderReferenceDate);
        updateSliderDatetimeLabel();
    }

    function getClockNow() {
        return isClockPaused && pausedClockDate ? new Date(pausedClockDate.getTime()) : new Date();
    }

    function updateClockToggleButton() {
        if (!clockToggleButton) {
            return;
        }

        clockToggleButton.setAttribute('aria-pressed', String(isClockPaused));
        clockToggleButton.setAttribute('aria-label', isClockPaused ? 'Now' : 'Pause');
        clockToggleButton.title = isClockPaused ? 'Now' : 'Pause';
    }

    function setClockPaused(paused, targetDate) {
        if (paused) {
            pausedClockDate = targetDate ? new Date(targetDate.getTime()) : new Date();
            isClockPaused = true;
        } else {
            isClockPaused = false;
            pausedClockDate = null;
            resetDatetimeSliderToNow();
        }

        document.body.classList.toggle('clock-paused', isClockPaused);
        updateClockToggleButton();
        updateSliderDatetimeLabel();
        updateBrowserClock();
        updatePinTimes();
    }

    // UTC offset to IANA timezone names mapping (multiple zones per offset for DST handling)
    const utcOffsetToTimezones = {
        'UTC-12:00': ['Etc/GMT+12'],
        'UTC-11:00': ['Pacific/Pago_Pago', 'Pacific/Niue'],
        'UTC-10:00': ['Pacific/Honolulu', 'Pacific/Rarotonga'],
        'UTC-09:30': ['Pacific/Marquesas'],
        'UTC-09:00': ['America/Anchorage', 'Pacific/Gambier'],
        'UTC-08:00': ['America/Los_Angeles', 'America/Vancouver', 'America/Tijuana', 'US/Pacific'],
        'UTC-07:00': ['America/Denver', 'America/Phoenix', 'America/Chihuahua', 'US/Mountain'],
        'UTC-06:00': ['America/Chicago', 'America/Mexico_City', 'America/Tegucigalpa', 'US/Central'],
        'UTC-05:00': ['America/New_York', 'America/Toronto', 'America/Bogota', 'US/Eastern'],
        'UTC-04:00': ['America/Halifax', 'America/Caracas', 'Atlantic/Bermuda'],
        'UTC-03:30': ['Canada/Newfoundland'],
        'UTC-03:00': ['America/Sao_Paulo', 'America/Argentina/Buenos_Aires', 'America/Cayenne', 'America/Paramaribo'],
        'UTC-02:00': ['Atlantic/South_Georgia'],
        'UTC-01:00': ['Atlantic/Azores', 'Atlantic/Cape_Verde'],
        'UTC+00:00': ['Europe/London', 'Europe/Dublin', 'Atlantic/Reykjavik', 'Africa/Casablanca', 'UTC'],
        'UTC+01:00': ['Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Africa/Lagos'],
        'UTC+02:00': ['Africa/Johannesburg', 'Africa/Cairo', 'Asia/Jerusalem', 'Europe/Athens', 'Europe/Helsinki'],
        'UTC+03:00': ['Africa/Nairobi', 'Europe/Moscow', 'Asia/Baghdad', 'Asia/Riyadh'],
        'UTC+03:30': ['Asia/Tehran'],
        'UTC+04:00': ['Asia/Dubai', 'Asia/Baku', 'Indian/Mauritius'],
        'UTC+04:30': ['Asia/Kabul'],
        'UTC+05:00': ['Asia/Tashkent', 'Asia/Karachi'],
        'UTC+05:30': ['Asia/Kolkata', 'Asia/Colombo'],
        'UTC+05:45': ['Asia/Kathmandu'],
        'UTC+06:00': ['Asia/Dhaka', 'Asia/Almaty'],
        'UTC+06:30': ['Asia/Yangon', 'Indian/Cocos'],
        'UTC+07:00': ['Asia/Bangkok', 'Asia/Ho_Chi_Minh', 'Asia/Jakarta'],
        'UTC+08:00': ['Asia/Shanghai', 'Asia/Singapore', 'Asia/Hong_Kong', 'Australia/Perth'],
        'UTC+08:45': ['Australia/Eucla'],
        'UTC+09:00': ['Asia/Tokyo', 'Asia/Seoul', 'Pacific/Guam'],
        'UTC+09:30': ['Australia/Darwin', 'Australia/Adelaide'],
        'UTC+10:00': ['Australia/Brisbane', 'Australia/Sydney', 'Pacific/Port_Moresby'],
        'UTC+10:30': ['Australia/Lord_Howe'],
        'UTC+11:00': ['Pacific/Guadalcanal', 'Pacific/Bougainville'],
        'UTC+12:00': ['Pacific/Fiji', 'Pacific/Nauru', 'Pacific/Tarawa', 'NZ'],
        'UTC+12:45': ['Pacific/Chatham'],
        'UTC+13:00': ['Pacific/Nadi', 'Pacific/Tongatapu'],
        'UTC+14:00': ['Pacific/Kiritimati']
    };

    // Mapping of IANA timezone names to their abbreviations (with DST variants)
    const ianaTimezoneAbbreviations = {
        // North America - US
        'America/Los_Angeles': { std: 'PST', dst: 'PDT' },
        'America/Denver': { std: 'MST', dst: 'MDT' },
        'America/Chicago': { std: 'CST', dst: 'CDT' },
        'America/New_York': { std: 'EST', dst: 'EDT' },
        'US/Pacific': { std: 'PST', dst: 'PDT' },
        'US/Mountain': { std: 'MST', dst: 'MDT' },
        'US/Central': { std: 'CST', dst: 'CDT' },
        'US/Eastern': { std: 'EST', dst: 'EDT' },
        'America/Anchorage': { std: 'AKST', dst: 'AKDT' },
        'America/Phoenix': { std: 'MST', dst: 'MST' }, // No DST in Arizona
        'America/Juneau': { std: 'AKST', dst: 'AKDT' },
        
        // North America - Canada
        'America/Vancouver': { std: 'PST', dst: 'PDT' },
        'America/Calgary': { std: 'MST', dst: 'MDT' },
        'America/Toronto': { std: 'EST', dst: 'EDT' },
        'America/Halifax': { std: 'AST', dst: 'ADT' },
        'Canada/Newfoundland': { std: 'NST', dst: 'NDT' },
        'America/Argentina/Buenos_Aires': { std: 'ART', dst: 'ART' }, // No DST
        
        // Central America
        'America/Mexico_City': { std: 'CST', dst: 'CDT' },
        'America/Guatemala': { std: 'CST', dst: 'CST' }, // No DST
        'America/Tegucigalpa': { std: 'CST', dst: 'CST' }, // No DST
        'America/Cayenne': { std: 'GFT', dst: 'GFT' }, // French Guiana - No DST
        'America/Paramaribo': { std: 'SRT', dst: 'SRT' }, // Suriname - No DST
        'America/Bogota': { std: 'COT', dst: 'COT' }, // Colombia - No DST
        
        // South America
        'America/Sao_Paulo': { std: 'BRT', dst: 'BRST' },
        'America/Buenos_Aires': { std: 'ART', dst: 'ART' }, // No DST (deprecated alias)
        'America/Caracas': { std: 'VET', dst: 'VET' }, // No DST
        
        // Atlantic
        'Atlantic/Azores': { std: 'AZOT', dst: 'AZODT' },
        'Atlantic/Cape_Verde': { std: 'CVT', dst: 'CVT' }, // No DST
        'Atlantic/Bermuda': { std: 'AST', dst: 'ADT' },
        'Atlantic/South_Georgia': { std: 'GST', dst: 'GST' }, // No DST
        
        // Europe
        'Europe/London': { std: 'GMT', dst: 'BST' },
        'Europe/Dublin': { std: 'GMT', dst: 'IST' },
        'Europe/Paris': { std: 'CET', dst: 'CEST' },
        'Europe/Berlin': { std: 'CET', dst: 'CEST' },
        'Europe/Madrid': { std: 'CET', dst: 'CEST' },
        'Europe/Rome': { std: 'CET', dst: 'CEST' },
        'Europe/Amsterdam': { std: 'CET', dst: 'CEST' },
        'Europe/Brussels': { std: 'CET', dst: 'CEST' },
        'Europe/Vienna': { std: 'CET', dst: 'CEST' },
        'Europe/Prague': { std: 'CET', dst: 'CEST' },
        'Europe/Budapest': { std: 'CET', dst: 'CEST' },
        'Europe/Warsaw': { std: 'CET', dst: 'CEST' },
        'Europe/Athens': { std: 'EET', dst: 'EEST' },
        'Europe/Helsinki': { std: 'EET', dst: 'EEST' },
        'Europe/Bucharest': { std: 'EET', dst: 'EEST' },
        'Europe/Kiev': { std: 'EET', dst: 'EEST' },
        'Europe/Moscow': { std: 'MSK', dst: 'MSK' }, // No DST
        'Europe/Istanbul': { std: 'TRT', dst: 'TRT' }, // No DST (UTC+03 permanently)
        'Atlantic/Reykjavik': { std: 'GMT', dst: 'GMT' }, // No DST
        
        // Africa
        'Africa/Lagos': { std: 'WAT', dst: 'WAT' }, // No DST
        'Africa/Cairo': { std: 'EET', dst: 'EET' }, // No DST (Egypt abolished DST in 2011)
        'Africa/Nairobi': { std: 'EAT', dst: 'EAT' }, // No DST
        'Africa/Johannesburg': { std: 'SAST', dst: 'SAST' }, // No DST
        'Africa/Casablanca': { std: 'WET', dst: 'WEST' },
        
        // Middle East
        'Asia/Tehran': { std: 'IRST', dst: 'IRDT' },
        'Asia/Dubai': { std: 'GST', dst: 'GST' }, // No DST
        'Asia/Baghdad': { std: 'AST', dst: 'AST' }, // No DST (Iraq abolished DST in 2008)
        'Asia/Riyadh': { std: 'AST', dst: 'AST' }, // Arabia Standard Time - No DST
        'Asia/Jerusalem': { std: 'IST', dst: 'IDT' },
        'Asia/Beirut': { std: 'EET', dst: 'EEST' },
        'Asia/Baku': { std: 'AZT', dst: 'AZST' },
        
        // South Asia
        'Asia/Kolkata': { std: 'IST', dst: 'IST' }, // No DST (India Standard Time)
        'Asia/Kathmandu': { std: 'NPT', dst: 'NPT' }, // No DST
        'Asia/Colombo': { std: 'PKT', dst: 'PKT' }, // No DST
        'Asia/Karachi': { std: 'PKT', dst: 'PKT' }, // No DST
        
        // Central Asia
        'Asia/Tashkent': { std: 'UZT', dst: 'UZT' }, // No DST
        'Asia/Almaty': { std: 'ALMT', dst: 'ALMT' }, // No DST
        'Asia/Kabul': { std: 'AFT', dst: 'AFT' }, // No DST
        
        // Southeast Asia
        'Asia/Bangkok': { std: 'ICT', dst: 'ICT' }, // No DST
        'Asia/Ho_Chi_Minh': { std: 'ICT', dst: 'ICT' }, // No DST
        'Asia/Jakarta': { std: 'WIB', dst: 'WIB' }, // No DST
        'Asia/Singapore': { std: 'SGT', dst: 'SGT' }, // No DST
        'Asia/Hong_Kong': { std: 'HKT', dst: 'HKT' }, // No DST
        'Asia/Yangon': { std: 'MMT', dst: 'MMT' }, // No DST
        
        // East Asia
        'Asia/Shanghai': { std: 'CST', dst: 'CST' }, // No DST (China Standard Time)
        'Asia/Tokyo': { std: 'JST', dst: 'JST' }, // No DST
        'Asia/Seoul': { std: 'KST', dst: 'KST' }, // No DST
        'Asia/Taipei': { std: 'CST', dst: 'CST' }, // No DST (Taiwan)
        
        // Australia & Oceania
        'Australia/Perth': { std: 'AWST', dst: 'AWST' }, // No DST
        'Australia/Darwin': { std: 'ACST', dst: 'ACST' }, // No DST
        'Australia/Adelaide': { std: 'ACST', dst: 'ACDT' },
        'Australia/Sydney': { std: 'AEST', dst: 'AEDT' },
        'Australia/Brisbane': { std: 'AEST', dst: 'AEST' }, // No DST
        'Australia/Lord_Howe': { std: 'LHST', dst: 'LHDT' },
        'Australia/Eucla': { std: 'ACWST', dst: 'ACWST' }, // No DST

        // New Zealand
        'Pacific/Auckland': { std: 'NZST', dst: 'NZDT' },
        'Pacific/Chatham': { std: 'CHAST', dst: 'CHADT' },
        'NZ': { std: 'NZST', dst: 'NZDT' },

        // Pacific
        'Pacific/Honolulu': { std: 'HST', dst: 'HST' }, // No DST
        'Pacific/Pago_Pago': { std: 'SST', dst: 'SST' }, // No DST
        'Pacific/Fiji': { std: 'FJT', dst: 'FJDT' },
        'Pacific/Nadi': { std: 'FJT', dst: 'FJDT' },
        'Pacific/Port_Moresby': { std: 'PGT', dst: 'PGT' }, // No DST
        'Pacific/Guadalcanal': { std: 'SBT', dst: 'SBT' }, // No DST
        'Pacific/Tongatapu': { std: 'TOT', dst: 'TOST' },
        'Pacific/Kiritimati': { std: 'LINT', dst: 'LINT' }, // No DST
        // Samoa
        'Pacific/Apia': { std: 'WSST', dst: 'WSDT' },
        // Papua New Guinea
        'Pacific/Port_Moresby': { std: 'PGT', dst: 'PGT' }, // No DST
        // Solomon Islands
        'Pacific/Guadalcanal': { std: 'SBT', dst: 'SBT' }, // No DST
        // New Caledonia
        'Pacific/Noumea': { std: 'NCT', dst: 'NCT' }, // No DST
        // Vanuatu
        'Pacific/Efate': { std: 'VUT', dst: 'VUT' }, // No DST
        // Tonga
        'Pacific/Tongatapu': { std: 'TOT', dst: 'TOST' },
        // Cook Islands
        'Pacific/Rarotonga': { std: 'CKT', dst: 'CKT' }, // No DST
        // Niue
        'Pacific/Niue': { std: 'NUT', dst: 'NUT' }, // No DST
        // Tokelau
        'Pacific/Fakaofo': { std: 'TKT', dst: 'TKT' }, // No DST
        // Wallis and Futuna
        'Pacific/Wallis': { std: 'WFT', dst: 'WFT' }, // No DST

        // Add more as needed for completeness
        
        // UTC & Etc
        'UTC': { std: 'UTC', dst: 'UTC' },
        'Etc/GMT+12': { std: 'GMT', dst: 'GMT' }
    };

    function setMenuOpen(isOpen) {
        sideMenu.classList.toggle('open', isOpen);
        overlay.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('is-hidden', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    }

    menuToggle.addEventListener('click', function() {
        setMenuOpen(true);
    });

    menuClose.addEventListener('click', function() {
        setMenuOpen(false);
    });

    overlay.addEventListener('click', function() {
        setMenuOpen(false);
    });

    document.querySelectorAll('.side-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            setMenuOpen(false);
        });
    });

    function getTileWidth() {
        if (cachedTileWidth > 0) {
            return cachedTileWidth;
        }

        cachedTileWidth = mapTiles[0] ? mapTiles[0].getBoundingClientRect().width : 0;
        return cachedTileWidth;
    }

    function setMapInteractionActive(isActive) {
        if (!mapContainer) {
            return;
        }

        if (isActive) {
            if (mapInteractionTimeoutId !== null) {
                window.clearTimeout(mapInteractionTimeoutId);
                mapInteractionTimeoutId = null;
            }
            mapContainer.classList.add('is-interacting');
            return;
        }

        if (mapInteractionTimeoutId !== null) {
            window.clearTimeout(mapInteractionTimeoutId);
        }

        mapInteractionTimeoutId = window.setTimeout(function() {
            mapContainer.classList.remove('is-interacting');
            mapInteractionTimeoutId = null;
        }, 120);
    }

    function updateMapTileGeometry() {
        if (!mapContainer || !mapTiles.length) {
            return;
        }

        const baseHeight = mapContainer.clientHeight;
        if (!baseHeight) {
            return;
        }

        const tileHeight = Math.max(1, Math.round(baseHeight * mapZoom));
        const tileWidth = Math.max(1, Math.round(tileHeight * mapAspectRatio));

        // Skip DOM writes when dimensions are unchanged.
        if (tileWidth === cachedTileWidth && tileHeight === cachedTileHeight) {
            return;
        }

        cachedTileWidth = tileWidth;
        cachedTileHeight = tileHeight;

        mapTiles.forEach(function(tile) {
            tile.style.height = `${tileHeight}px`;
            tile.style.width = `${tileWidth}px`;
        });

        if (mapWrapper) {
            mapWrapper.style.height = `${tileHeight}px`;
            mapWrapper.style.width = `${tileWidth * mapTiles.length}px`;
        }
    }

    function clampMapZoom(value) {
        const boundedValue = Math.max(mapZoomMin, Math.min(mapZoomMax, value));
        return Math.round(boundedValue * 100) / 100;
    }

    function updateMapZoomUi() {
        const zoomPercent = Math.round(mapZoom * 100);
        if (mapZoomValue) {
            mapZoomValue.textContent = `${zoomPercent}%`;
        }
        if (mapZoomResetButton) {
            mapZoomResetButton.textContent = `${zoomPercent}%`;
        }
        if (mapZoomOutButton) {
            mapZoomOutButton.disabled = mapZoom <= mapZoomMin;
        }
        if (mapZoomInButton) {
            mapZoomInButton.disabled = mapZoom >= mapZoomMax;
        }
    }

    function setMapZoom(nextZoomValue, options) {
        const zoomOptions = options || {};
        const nextZoom = clampMapZoom(nextZoomValue);
        if (Math.abs(nextZoom - mapZoom) < 0.001) {
            updateMapZoomUi();
            return;
        }

        const containerRect = mapContainer.getBoundingClientRect();
        const focusClientX = Number.isFinite(zoomOptions.clientX)
            ? zoomOptions.clientX
            : containerRect.left + (containerRect.width / 2);
        const focusClientY = Number.isFinite(zoomOptions.clientY)
            ? zoomOptions.clientY
            : containerRect.top + (containerRect.height / 2);
        const focusOffsetX = focusClientX - containerRect.left;
        const focusOffsetY = focusClientY - containerRect.top;
        const worldX = mapContainer.scrollLeft + focusOffsetX;
        const worldY = mapContainer.scrollTop + focusOffsetY;
        const zoomRatio = nextZoom / mapZoom;

        mapZoom = nextZoom;
        mapContainer.style.setProperty('--map-zoom', String(mapZoom));
        setMapInteractionActive(true);
        updateMapTileGeometry();

        mapContainer.scrollLeft = (worldX * zoomRatio) - focusOffsetX;
        mapContainer.scrollTop = (worldY * zoomRatio) - focusOffsetY;

        keepLoopCentered();
        updateMapZoomUi();
        setMapInteractionActive(false);
    }

    function formatCountryLabel(rawValue) {
        if (!rawValue) {
            return 'Unknown country';
        }

        return rawValue
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function loadCountryLookup(metadataMarkup) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(metadataMarkup, 'image/svg+xml');
        doc.querySelectorAll('[id][name]').forEach(function(node) {
            const code = node.getAttribute('id');
            const name = node.getAttribute('name');
            if (!code || !name) {
                return;
            }
            countryCodeToName.set(code.toLowerCase(), name);
        });
    }

    function findCountryNameFromToken(token) {
        if (!token) {
            return '';
        }

        const normalized = token.toLowerCase();
        if (countryCodeToName.has(normalized)) {
            return countryCodeToName.get(normalized);
        }

        const prefix = normalized.split('-')[0].replace(/\d.*$/, '');
        if (prefix) {
            if (countryCodeToName.has(prefix)) {
                return countryCodeToName.get(prefix);
            }
            if (countryCodeFallback.has(prefix)) {
                return countryCodeFallback.get(prefix);
            }
        }

        return '';
    }

    function extractCountryCodeFromMultiTimezoneToken(token) {
        if (!token) {
            return null;
        }
        
        const match = token.toLowerCase().match(/^([a-z]{2})-\d+$/);
        if (match) {
            const code = match[1];
            if (countryCodeToName.has(code)) {
                return countryCodeToName.get(code);
            }
            if (countryCodeFallback.has(code)) {
                return countryCodeFallback.get(code);
            }
            return code;
        }
        
        return null;
    }

    function parseOffsetValue(rawText) {
        const value = parseInt(rawText, 10);
        if (Number.isNaN(value)) {
            return null;
        }

        const sign = value < 0 ? -1 : 1;
        const absolute = Math.abs(value);
        let hours = absolute;
        let minutes = 0;

        if (absolute >= 100) {
            hours = Math.floor(absolute / 100);
            minutes = absolute % 100;
        }

        if (hours > 14 || ![0, 30, 45].includes(minutes)) {
            return null;
        }

        return {
            hours: sign * hours,
            minutes: minutes,
            sign: sign
        };
    }

    function formatUtcOffset(offset) {
        if (!offset) {
            return '';
        }

        const sign = offset.sign < 0 ? '-' : '+';
        const hourText = String(Math.abs(offset.hours)).padStart(2, '0');
        const minuteText = String(offset.minutes).padStart(2, '0');
        return `UTC${sign}${hourText}:${minuteText}`;
    }

    function inferTimezoneFromTokens(tokens) {
        for (const token of tokens) {
            const normalizedToken = token.toLowerCase();
            if (helperClassTokens.has(normalizedToken)) {
                continue;
            }

            const numericParts = normalizedToken.match(/-?\d{1,4}/g) || [];
            for (const rawPart of numericParts) {
                const parsed = parseOffsetValue(rawPart);
                if (parsed) {
                    return formatUtcOffset(parsed);
                }
            }
        }

        return '';
    }

    function inferTimezoneFromClassList(target, xPercent) {
        const rawClassName = target && target.getAttribute ? (target.getAttribute('class') || '') : '';
        const tokens = rawClassName.split(/\s+/).filter(Boolean);

        const explicitOffset = inferTimezoneFromTokens(tokens);
        if (explicitOffset) {
            return explicitOffset;
        }

        // Use floor to avoid a +1 bias seen on ocean drops near zone boundaries.
        const approximate = Math.floor((xPercent / 100) * 24 - 12);
        const clamped = Math.max(-12, Math.min(14, approximate));
        return formatUtcOffset({
            hours: clamped,
            minutes: 0,
            sign: clamped < 0 ? -1 : 1
        });
    }

    function isOceanCountryLabel(label) {
        return String(label || '').trim().toLowerCase() === 'ocean';
    }

    function inferTimezoneFromPoint(svg, fallbackTarget, clientX, clientY, xPercent) {
        const elementsAtPoint = document.elementsFromPoint
            ? document.elementsFromPoint(clientX, clientY)
            : [];

        for (const node of elementsAtPoint) {
            if (!node || !node.getAttribute) {
                continue;
            }

            if (svg && node.ownerSVGElement && node.ownerSVGElement !== svg) {
                continue;
            }

            const className = node.getAttribute('class') || '';
            if (!className) {
                continue;
            }

            const tokens = className.split(/\s+/).filter(Boolean);
            const explicitOffset = inferTimezoneFromTokens(tokens);
            if (explicitOffset) {
                return explicitOffset;
            }
        }

        return inferTimezoneFromClassList(fallbackTarget, xPercent);
    }

    function getCountryIdentity(element) {
        if (!element || element.tagName.toLowerCase() === 'svg') {
            return null;
        }

        const name = element.getAttribute('name');
        const id = element.getAttribute('id');
        const classTokens = (element.getAttribute('class') || '').split(/\s+/).filter(Boolean);
        let resolvedName = name || '';

        if (!resolvedName && id) {
            resolvedName = findCountryNameFromToken(id) || '';
            
            if (!resolvedName) {
                const multiTimezoneName = extractCountryCodeFromMultiTimezoneToken(id);
                if (multiTimezoneName) {
                    resolvedName = multiTimezoneName;
                }
            }
        }

        if (!resolvedName) {
            for (const token of classTokens) {
                const tokenName = findCountryNameFromToken(token);
                if (tokenName) {
                    resolvedName = tokenName;
                    break;
                }
                
                const multiTimezoneName = extractCountryCodeFromMultiTimezoneToken(token);
                if (multiTimezoneName) {
                    resolvedName = multiTimezoneName;
                    break;
                }
            }
        }

        if (!resolvedName) {
            return null;
        }

        const keySource = id || resolvedName;
        if (!keySource) {
            return null;
        }

        return {
            key: keySource.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            label: formatCountryLabel(resolvedName)
        };
    }

    function normalizeMapLabel(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getCountryShapeMatchByLabel(svg, label) {
        if (!svg || !label) {
            return null;
        }

        const normalizedTarget = normalizeMapLabel(label);
        if (!normalizedTarget) {
            return null;
        }

        const candidateShapes = Array.from(svg.querySelectorAll('[data-country-label]'));
        let bestMatch = null;
        let bestArea = -1;

        for (const shape of candidateShapes) {
            const shapeLabel = shape.getAttribute('data-country-label') || '';
            if (normalizeMapLabel(shapeLabel) !== normalizedTarget) {
                continue;
            }

            let area = 0;
            try {
                const bbox = shape.getBBox();
                if (bbox && Number.isFinite(bbox.width) && Number.isFinite(bbox.height)) {
                    area = Math.max(0, bbox.width * bbox.height);
                }
            } catch (error) {
                area = 0;
            }

            if (area > bestArea) {
                bestArea = area;
                bestMatch = {
                    shape: shape,
                    shapeLabel: shapeLabel
                };
            }
        }

        return bestMatch;
    }

    function getTimezonePinCountryLabel(timezone) {
        const timezoneLabel = String(timezone || '').trim();
        if (!timezoneLabel) {
            return '';
        }

        const firstTile = mapTiles[0];
        const svg = firstTile ? firstTile.querySelector('svg') : null;

        if (timezonePinCountryMap[timezoneLabel]) {
            const mappedLabel = timezonePinCountryMap[timezoneLabel];
            if (!svg) {
                return mappedLabel;
            }

            const mappedShapeMatch = getCountryShapeMatchByLabel(svg, mappedLabel);
            if (mappedShapeMatch) {
                return mappedShapeMatch.shapeLabel;
            }

            // No exact shape on the map (small/island states): trust the curated
            // country name rather than falling through to "Ocean".
            return mappedLabel;
        }

        const aliasMatches = chipTimezoneAliasEntries.filter(function(entry) {
            return entry[1] === timezoneLabel;
        }).map(function(entry) {
            return entry[0];
        });

        if (svg) {
            for (const label of aliasMatches) {
                const aliasShapeMatch = getCountryShapeMatchByLabel(svg, label);
                if (aliasShapeMatch) {
                    return aliasShapeMatch.shapeLabel;
                }
            }
        }

        for (const label of aliasMatches) {
            const normalizedLabel = normalizeMapLabel(label);
            if (countryCodeToName.has(normalizedLabel)) {
                return countryCodeToName.get(normalizedLabel);
            }
            if (countryCodeFallback.has(normalizedLabel)) {
                return countryCodeFallback.get(normalizedLabel);
            }
        }

        const zoneParts = timezoneLabel.split('/').filter(Boolean);
        const tail = zoneParts[zoneParts.length - 1] || '';
        const normalizedTail = normalizeMapLabel(tail.replace(/_/g, ' '));
        if (countryCodeToName.has(normalizedTail)) {
            return countryCodeToName.get(normalizedTail);
        }
        if (countryCodeFallback.has(normalizedTail)) {
            return countryCodeFallback.get(normalizedTail);
        }

        return '';
    }

    function getSvgViewBoxMetrics(svg) {
        if (!svg || !svg.viewBox || !svg.viewBox.baseVal) {
            return null;
        }

        const viewBox = svg.viewBox.baseVal;
        if (!viewBox.width || !viewBox.height) {
            return null;
        }

        return viewBox;
    }

    function getShapeCenterPercent(svg, shape) {
        if (!svg || !shape) {
            return null;
        }

        const viewBox = getSvgViewBoxMetrics(svg);
        if (!viewBox) {
            return null;
        }

        try {
            const bbox = shape.getBBox();
            if (!bbox || !Number.isFinite(bbox.width) || !Number.isFinite(bbox.height)) {
                return null;
            }

            const centerX = bbox.x + (bbox.width / 2);
            const centerY = bbox.y + (bbox.height / 2);

            return {
                xPercent: Math.max(0, Math.min(100, ((centerX - viewBox.x) / viewBox.width) * 100)),
                yPercent: Math.max(0, Math.min(100, ((centerY - viewBox.y) / viewBox.height) * 100))
            };
        } catch (error) {
            return null;
        }
    }

    function getTimezoneOffsetFallbackPercent(timezone) {
        const offsetMs = getTimezoneOffsetMs(timezone, new Date());
        const offsetMinutes = Math.max(-12 * 60, Math.min(14 * 60, Math.round(offsetMs / 60000)));
        const xPercent = ((offsetMinutes + (12 * 60)) / (26 * 60)) * 100;

        return {
            xPercent: Math.max(0, Math.min(100, xPercent)),
            yPercent: 50
        };
    }

    // The world map is a Miller cylindrical projection centered on 0° longitude.
    // The SVG embeds an exact degree graticule (longitude labels along the top,
    // latitude labels down each side), so the projection is calibrated directly
    // from those labels at runtime. These constants (derived from that grid) are
    // the fallback if the labels cannot be read.
    //   x% = lonFit.intercept + lonFit.slope * lon
    //   y% = latFit.intercept + latFit.slope * millerY(lat)
    const DEFAULT_LON_FIT = { slope: 0.276667, intercept: 46.65 };
    const DEFAULT_LAT_FIT = { slope: -29.27, intercept: 62.35 };
    let cachedMapProjection = null;

    function invalidateMapProjection() {
        cachedMapProjection = null;
    }

    // Miller cylindrical projection Y value (north positive, unitless).
    function millerY(lat) {
        const clamped = Math.max(-89.5, Math.min(89.5, lat));
        const phi = clamped * Math.PI / 180;
        return 1.25 * Math.log(Math.tan((Math.PI / 4) + (0.4 * phi)));
    }

    function fitLinear(xs, ys) {
        const n = Math.min(xs.length, ys.length);
        if (n < 2) {
            return null;
        }

        let sx = 0;
        let sy = 0;
        let sxx = 0;
        let sxy = 0;
        for (let i = 0; i < n; i += 1) {
            sx += xs[i];
            sy += ys[i];
            sxx += xs[i] * xs[i];
            sxy += xs[i] * ys[i];
        }

        const denom = (n * sxx) - (sx * sx);
        if (Math.abs(denom) < 1e-9) {
            return null;
        }

        const slope = ((n * sxy) - (sx * sy)) / denom;
        const intercept = (sy - (slope * sx)) / n;
        return { slope: slope, intercept: intercept };
    }

    function buildMapProjection() {
        const firstTile = mapTiles[0];
        const svg = firstTile ? firstTile.querySelector('svg') : null;
        if (!svg) {
            return { lonFit: DEFAULT_LON_FIT, latFit: DEFAULT_LAT_FIT };
        }

        const viewBox = getSvgViewBoxMetrics(svg);
        if (!viewBox) {
            return { lonFit: DEFAULT_LON_FIT, latFit: DEFAULT_LAT_FIT };
        }

        const texts = svg.querySelectorAll('text');
        const lonLabels = [];
        const latLabels = [];

        texts.forEach(function(node) {
            const raw = (node.textContent || '').trim();
            // Graticule degree labels are plain unsigned integers (timezone-hour
            // labels carry a +/- sign, so they are naturally excluded).
            if (!/^\d{1,3}$/.test(raw)) {
                return;
            }
            let bbox;
            try {
                bbox = node.getBBox();
            } catch (error) {
                return;
            }
            const cx = ((bbox.x + (bbox.width / 2)) - viewBox.x) / viewBox.width * 100;
            const cy = ((bbox.y + (bbox.height / 2)) - viewBox.y) / viewBox.height * 100;

            // Longitude labels run along the very top edge of the map.
            if (cy < 3.5) {
                lonLabels.push({ x: cx, value: Number(raw) });
            } else if (cx < 3) {
                // Latitude labels run down the left edge.
                latLabels.push({ y: cy, value: Number(raw) });
            }
        });

        let lonFit = DEFAULT_LON_FIT;
        if (lonLabels.length >= 6) {
            // Sorted west→east the labels step uniformly by 15° from -165 to +180.
            lonLabels.sort(function(a, b) { return a.x - b.x; });
            const lons = lonLabels.map(function(_, index) { return -165 + (index * 15); });
            const xs = lonLabels.map(function(item) { return item.x; });
            const fit = fitLinear(lons, xs);
            if (fit && Number.isFinite(fit.slope) && Number.isFinite(fit.intercept)) {
                lonFit = fit;
            }
        }

        let latFit = DEFAULT_LAT_FIT;
        if (latLabels.length >= 4) {
            // Sorted north→south (top→bottom) the labels step by 15° from +75.
            latLabels.sort(function(a, b) { return a.y - b.y; });
            const millers = latLabels.map(function(_, index) { return millerY(75 - (index * 15)); });
            const ys = latLabels.map(function(item) { return item.y; });
            const fit = fitLinear(millers, ys);
            if (fit && Number.isFinite(fit.slope) && Number.isFinite(fit.intercept)) {
                latFit = fit;
            }
        }

        return { lonFit: lonFit, latFit: latFit };
    }

    function getMapProjection() {
        if (cachedMapProjection) {
            return cachedMapProjection;
        }

        cachedMapProjection = buildMapProjection();
        return cachedMapProjection;
    }

    function projectLonLatToPercent(lon, lat) {
        const projection = getMapProjection();
        if (!projection) {
            return null;
        }

        const xPercent = (projection.lonFit.slope * lon) + projection.lonFit.intercept;
        const yPercent = (projection.latFit.slope * millerY(lat)) + projection.latFit.intercept;
        if (!Number.isFinite(xPercent) || !Number.isFinite(yPercent)) {
            return null;
        }

        return {
            xPercent: Math.max(0, Math.min(100, xPercent)),
            yPercent: Math.max(0, Math.min(100, yPercent))
        };
    }

    function getAnchorPercentFromLonLat(anchor) {
        if (!anchor || !Number.isFinite(anchor.lon) || !Number.isFinite(anchor.lat)) {
            return null;
        }

        const projected = projectLonLatToPercent(anchor.lon, anchor.lat);
        if (projected) {
            return projected;
        }

        // Fallback: plain equirectangular if calibration is unavailable.
        return {
            xPercent: Math.max(0, Math.min(100, ((anchor.lon + 180) / 360) * 100)),
            yPercent: Math.max(0, Math.min(100, ((90 - anchor.lat) / 180) * 100))
        };
    }

    function normalizeAnchorLabel(label) {
        return String(label || '')
            .toLowerCase()
            .replace(/[^a-z0-9\s]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getLocationAnchorKeyCandidates(preferredLabel) {
        const base = normalizeAnchorLabel(preferredLabel);
        if (!base) {
            return [];
        }

        const candidates = new Set([base]);
        const withoutTrailingParen = base.replace(/\s*\([^)]*\)\s*$/, '').trim();
        if (withoutTrailingParen) {
            candidates.add(withoutTrailingParen);
        }

        const beforeComma = withoutTrailingParen.split(',')[0].trim();
        if (beforeComma) {
            candidates.add(beforeComma);
        }

        const withoutCitySuffix = beforeComma.replace(/\s+city$/, '').trim();
        if (withoutCitySuffix) {
            candidates.add(withoutCitySuffix);
        }

        // Resolve alternate spellings / historical names to their canonical key.
        Array.from(candidates).forEach(function(key) {
            if (anchorLabelAliases[key]) {
                candidates.add(anchorLabelAliases[key]);
            }
        });

        return Array.from(candidates);
    }

    function getPreferredLocationPercent(preferredLabel) {
        const keys = getLocationAnchorKeyCandidates(preferredLabel);
        for (const key of keys) {
            if (!locationPinPercentMap[key]) {
                continue;
            }

            const value = locationPinPercentMap[key];
            return {
                xPercent: Math.max(0, Math.min(100, value.xPercent)),
                yPercent: Math.max(0, Math.min(100, value.yPercent))
            };
        }

        return null;
    }

    function getPreferredLocationAnchor(preferredLabel, timezone) {
        const keys = getLocationAnchorKeyCandidates(preferredLabel);
        for (const key of keys) {
            if (locationPinAnchorMap[key]) {
                return locationPinAnchorMap[key];
            }
        }

        for (const key of keys) {
            if (countryCapitalAnchorMap[key]) {
                return countryCapitalAnchorMap[key];
            }
        }

        return timezonePinAnchorMap[timezone] || null;
    }

    function getCountryShapeCandidates(svg, countryLabel) {
        if (!svg || !countryLabel) {
            return [];
        }

        const normalizedTarget = normalizeMapLabel(countryLabel);
        if (!normalizedTarget) {
            return [];
        }

        const candidates = [];
        const candidateShapes = Array.from(svg.querySelectorAll('[data-country-label]'));

        for (const shape of candidateShapes) {
            const shapeLabel = shape.getAttribute('data-country-label') || '';
            if (normalizeMapLabel(shapeLabel) !== normalizedTarget) {
                continue;
            }

            const placement = getShapeCenterPercent(svg, shape);
            if (!placement) {
                continue;
            }

            let area = 0;
            let minXPercent = placement.xPercent;
            let maxXPercent = placement.xPercent;
            let minYPercent = placement.yPercent;
            let maxYPercent = placement.yPercent;
            try {
                const bbox = shape.getBBox();
                if (bbox && Number.isFinite(bbox.width) && Number.isFinite(bbox.height)) {
                    area = Math.max(0, bbox.width * bbox.height);
                    const viewBox = getSvgViewBoxMetrics(svg);
                    if (viewBox) {
                        minXPercent = Math.max(0, Math.min(100, ((bbox.x - viewBox.x) / viewBox.width) * 100));
                        maxXPercent = Math.max(0, Math.min(100, (((bbox.x + bbox.width) - viewBox.x) / viewBox.width) * 100));
                        minYPercent = Math.max(0, Math.min(100, ((bbox.y - viewBox.y) / viewBox.height) * 100));
                        maxYPercent = Math.max(0, Math.min(100, (((bbox.y + bbox.height) - viewBox.y) / viewBox.height) * 100));
                    }
                }
            } catch (error) {
                area = 0;
            }

            candidates.push({
                shape: shape,
                shapeLabel: shapeLabel,
                xPercent: placement.xPercent,
                yPercent: placement.yPercent,
                area: area,
                minXPercent: minXPercent,
                maxXPercent: maxXPercent,
                minYPercent: minYPercent,
                maxYPercent: maxYPercent
            });
        }

        return candidates;
    }

    function getPercentFromSvgPoint(svg, point) {
        const viewBox = getSvgViewBoxMetrics(svg);
        if (!viewBox || !point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
            return null;
        }

        return {
            xPercent: Math.max(0, Math.min(100, ((point.x - viewBox.x) / viewBox.width) * 100)),
            yPercent: Math.max(0, Math.min(100, ((point.y - viewBox.y) / viewBox.height) * 100))
        };
    }

    function getSvgPointFromPercent(svg, xPercent, yPercent) {
        const viewBox = getSvgViewBoxMetrics(svg);
        if (!viewBox) {
            return null;
        }

        return {
            x: viewBox.x + (Math.max(0, Math.min(100, xPercent)) / 100) * viewBox.width,
            y: viewBox.y + (Math.max(0, Math.min(100, yPercent)) / 100) * viewBox.height
        };
    }

    function isPointInsideShapeFill(shape, point) {
        if (!shape || !point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
            return false;
        }

        if (typeof shape.isPointInFill !== 'function') {
            return false;
        }

        try {
            const svgPoint = shape.ownerSVGElement && typeof shape.ownerSVGElement.createSVGPoint === 'function'
                ? shape.ownerSVGElement.createSVGPoint()
                : null;

            if (svgPoint) {
                svgPoint.x = point.x;
                svgPoint.y = point.y;
                return Boolean(shape.isPointInFill(svgPoint));
            }

            return Boolean(shape.isPointInFill(point));
        } catch (error) {
            return false;
        }
    }

    function constrainPercentToShape(svg, shapeCandidate, targetXPercent, targetYPercent) {
        const shape = shapeCandidate && shapeCandidate.shape;
        const centerX = shapeCandidate && Number.isFinite(shapeCandidate.xPercent) ? shapeCandidate.xPercent : targetXPercent;
        const centerY = shapeCandidate && Number.isFinite(shapeCandidate.yPercent) ? shapeCandidate.yPercent : targetYPercent;

        const targetPoint = getSvgPointFromPercent(svg, targetXPercent, targetYPercent);
        const centerPoint = getSvgPointFromPercent(svg, centerX, centerY);
        if (!shape || !targetPoint || !centerPoint) {
            return {
                xPercent: Math.max(0, Math.min(100, targetXPercent)),
                yPercent: Math.max(0, Math.min(100, targetYPercent))
            };
        }

        if (isPointInsideShapeFill(shape, targetPoint)) {
            return {
                xPercent: Math.max(0, Math.min(100, targetXPercent)),
                yPercent: Math.max(0, Math.min(100, targetYPercent))
            };
        }

        // Walk from shape center toward target and keep the farthest in-fill point.
        let low = 0;
        let high = 1;
        for (let i = 0; i < 16; i += 1) {
            const mid = (low + high) / 2;
            const probePoint = {
                x: centerPoint.x + (targetPoint.x - centerPoint.x) * mid,
                y: centerPoint.y + (targetPoint.y - centerPoint.y) * mid
            };

            if (isPointInsideShapeFill(shape, probePoint)) {
                low = mid;
            } else {
                high = mid;
            }
        }

        const insidePoint = {
            x: centerPoint.x + (targetPoint.x - centerPoint.x) * low,
            y: centerPoint.y + (targetPoint.y - centerPoint.y) * low
        };
        const insidePercent = getPercentFromSvgPoint(svg, insidePoint);
        if (insidePercent) {
            return insidePercent;
        }

        const clampedX = Math.max(shapeCandidate.minXPercent, Math.min(shapeCandidate.maxXPercent, targetXPercent));
        const clampedY = Math.max(shapeCandidate.minYPercent, Math.min(shapeCandidate.maxYPercent, targetYPercent));
        return {
            xPercent: clampedX,
            yPercent: clampedY
        };
    }

    function getBestTimezoneShapeCandidate(svg, countryLabel, timezone, preferredLabel) {
        const candidates = getCountryShapeCandidates(svg, countryLabel);
        if (!candidates.length) {
            return null;
        }

        const preferredAnchor = getPreferredLocationAnchor(preferredLabel, '');
        const timezoneAnchor = timezonePinAnchorMap[timezone] || null;
        const hasAnchorHint = Boolean(preferredAnchor || timezoneAnchor);
        const targetPlacement = getAnchorPercentFromLonLat(preferredAnchor)
            || getAnchorPercentFromLonLat(timezoneAnchor)
            || getTimezoneOffsetFallbackPercent(timezone);

        const targetX = targetPlacement.xPercent;
        const targetY = targetPlacement.yPercent;

        const ranked = candidates.slice().sort(function(a, b) {
            const dxA = a.xPercent - targetX;
            const dyA = (a.yPercent - targetY) * 0.4;
            const dxB = b.xPercent - targetX;
            const dyB = (b.yPercent - targetY) * 0.4;
            const xDiffA = Math.abs(dxA);
            const xDiffB = Math.abs(dxB);
            if (xDiffA !== xDiffB) {
                return xDiffA - xDiffB;
            }
            const yDiffA = Math.abs(dyA);
            const yDiffB = Math.abs(dyB);
            if (yDiffA !== yDiffB) {
                return yDiffA - yDiffB;
            }
            return b.area - a.area;
        });

        const best = ranked[0] || null;
        if (!best) {
            return null;
        }

        if (hasAnchorHint) {
            const constrained = constrainPercentToShape(svg, best, targetX, targetY);
            best.pinXPercent = constrained.xPercent;
            best.pinYPercent = constrained.yPercent;
        } else {
            best.pinXPercent = best.xPercent;
            best.pinYPercent = best.yPercent;
        }

        return best;
    }

    function getTimezonePinPlacement(timezone, preferredLabel) {
        const countryLabel = getTimezonePinCountryLabel(timezone);
        const preferredPercent = getPreferredLocationPercent(preferredLabel);
        if (preferredPercent) {
            return {
                xPercent: preferredPercent.xPercent,
                yPercent: preferredPercent.yPercent,
                countryLabel: countryLabel || 'Ocean',
                timezoneLabel: timezone
            };
        }

        // A known city anchor projects exactly onto the Miller-projection map.
        const preferredAnchor = getPreferredLocationAnchor(preferredLabel, '');
        if (preferredAnchor) {
            const projected = getAnchorPercentFromLonLat(preferredAnchor);
            if (projected) {
                return {
                    xPercent: projected.xPercent,
                    yPercent: projected.yPercent,
                    countryLabel: countryLabel || 'Ocean',
                    timezoneLabel: timezone
                };
            }
        }

        const firstTile = mapTiles[0];
        const svg = firstTile ? firstTile.querySelector('svg') : null;

        // No city anchor (e.g. a country or bare timezone was chosen): place the
        // pin within the country's drawn shape.
        if (svg && countryLabel) {
            const shapeMatch = getBestTimezoneShapeCandidate(svg, countryLabel, timezone, preferredLabel);
            if (shapeMatch) {
                return {
                    xPercent: shapeMatch.pinXPercent,
                    yPercent: shapeMatch.pinYPercent,
                    countryLabel: shapeMatch.shapeLabel,
                    timezoneLabel: timezone
                };
            }
        }

        const timezoneAnchor = getPreferredLocationAnchor('', timezone);
        const anchorPercent = getAnchorPercentFromLonLat(timezoneAnchor);
        if (anchorPercent) {
            return {
                xPercent: anchorPercent.xPercent,
                yPercent: anchorPercent.yPercent,
                countryLabel: countryLabel || 'Ocean',
                timezoneLabel: timezone
            };
        }

        const fallbackPlacement = getTimezoneOffsetFallbackPercent(timezone);
        return {
            xPercent: fallbackPlacement.xPercent,
            yPercent: fallbackPlacement.yPercent,
            countryLabel: countryLabel || 'Ocean',
            timezoneLabel: timezone
        };
    }

    function dropPinForSelectedTimezone() {
        const timezone = chipSelectedTimezone || browserResolvedTimezone;
        if (!timezone) {
            return;
        }

        const placement = getTimezonePinPlacement(timezone, chipSelectedLocationLabel);
        const countryLabel = placement.countryLabel || 'Ocean';

        pins.push({
            xPercent: Math.max(0, Math.min(100, placement.xPercent)),
            yPercent: Math.max(0, Math.min(100, placement.yPercent)),
            xNorm: Math.max(0, Math.min(1, placement.xPercent / 100)),
            yNorm: Math.max(0, Math.min(1, placement.yPercent / 100)),
            country: countryLabel,
            timezone: timezone,
            ianaTimezone: timezone,
            label: buildPinLabel(countryLabel, timezone)
        });

        updateSelectedCountry(countryLabel, timezone);
        renderPins();
    }

    function isHoverableCountryShape(node) {
        if (!node || !node.tagName) {
            return false;
        }

        const tagName = node.tagName.toLowerCase();
        const supportedTag = tagName === 'path'
            || tagName === 'polygon'
            || tagName === 'rect'
            || tagName === 'circle'
            || tagName === 'ellipse';

        if (!supportedTag) {
            return false;
        }

        // Ignore defs/clip helper shapes and obvious stroke-only helpers.
        if (node.closest('defs, clipPath, mask, pattern, marker, symbol')) {
            return false;
        }

        const fillAttr = String(node.getAttribute('fill') || '').trim().toLowerCase();
        const styleAttr = String(node.getAttribute('style') || '').toLowerCase();
        if (fillAttr === 'none' || fillAttr === 'transparent' || /fill\s*:\s*none/.test(styleAttr)) {
            return false;
        }

        return true;
    }

    function updateSelectedCountry(label, timezoneLabel) {
        selectedCountry = label || 'No country selected';
        selectedTimezone = timezoneLabel || '';
        if (selectedCountryName) {
            selectedCountryName.textContent = selectedCountry;
        }
        if (selectedCountryPill) {
            selectedCountryPill.textContent = selectedCountry;
        }

        if (pins.length) {
            const pinCountText = `${pins.length} pin${pins.length === 1 ? '' : 's'} placed on the looping map.`;
            if (selectedCountryMeta) {
                selectedCountryMeta.textContent = selectedTimezone
                    ? `Timezone: ${selectedTimezone}. ${pinCountText}`
                    : pinCountText;
            }
            return;
        }

        if (selectedCountryMeta) {
            selectedCountryMeta.textContent = 'Click anywhere on the map (including ocean) to drop a pin.';
        }
    }

    function updateBrowserClock() {
        const now = getClockNow();
        const timezone = browserResolvedTimezone || 'Timezone unavailable';
        if (browserTime) {
            browserTime.textContent = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
        if (browserTimezone) {
            browserTimezone.textContent = timezone;
        }
        if (!isClockPaused) {
            setSliderOffsetMinutes(getLiveSliderOffsetMinutes(now));
        }
        updateTimelineChipAndLabels();
    }

    function startTimelineChipDrag(event) {
        if (!sliderLiveChip || event.button !== 0) {
            return;
        }

        if (event.target instanceof Element && (event.target.closest('.chip-toggle') || event.target.closest('.chip-datetime-popup') || event.target.closest('.chip-timezone-input'))) {
            return;
        }

        sliderChipPointerId = event.pointerId;
        sliderChipDragClientX = event.clientX;
        sliderChipAutoPanStrength = 0;
        sliderLiveChip.classList.add('is-dragging');
        sliderLiveChip.setPointerCapture(event.pointerId);
        event.preventDefault();
    }

    function stopChipAutoPanLoop() {
        sliderChipAutoPanStrength = 0;
        if (sliderChipAutoPanRafId !== null) {
            window.cancelAnimationFrame(sliderChipAutoPanRafId);
            sliderChipAutoPanRafId = null;
        }
    }

    function updateChipAutoPanStrength(clientX) {
        if (!sliderDaySegments) {
            sliderChipAutoPanStrength = 0;
            return;
        }

        const rect = sliderDaySegments.getBoundingClientRect();
        const leftEdgeTrigger = rect.left + chipEdgePanThresholdPx;
        const rightEdgeTrigger = rect.right - chipEdgePanThresholdPx;

        if (clientX <= leftEdgeTrigger) {
            const leftProximity = (leftEdgeTrigger - clientX) / chipEdgePanThresholdPx;
            sliderChipAutoPanStrength = -Math.max(0, Math.min(1, leftProximity));
            return;
        }

        if (clientX >= rightEdgeTrigger) {
            const rightProximity = (clientX - rightEdgeTrigger) / chipEdgePanThresholdPx;
            sliderChipAutoPanStrength = Math.max(0, Math.min(1, rightProximity));
            return;
        }

        sliderChipAutoPanStrength = 0;
    }

    function applyChipDragAtClientX(clientX) {
        const nextOffset = offsetFromRailClientX(clientX);
        setSliderOffsetMinutes(nextOffset);
        setClockPaused(true, getSliderTargetDate());
    }

    function runChipAutoPanLoop() {
        if (sliderChipPointerId === null) {
            stopChipAutoPanLoop();
            return;
        }

        if (sliderChipAutoPanStrength !== 0) {
            const direction = sliderChipAutoPanStrength > 0 ? 1 : -1;
            const magnitude = Math.pow(Math.abs(sliderChipAutoPanStrength), chipEdgePanExponent);
            const deltaMinutes = direction * magnitude * chipEdgePanMaxMinutesPerFrame;
            shiftTimelineWindow(deltaMinutes);
            applyChipDragAtClientX(sliderChipDragClientX);
            sliderChipAutoPanRafId = window.requestAnimationFrame(runChipAutoPanLoop);
            return;
        }

        sliderChipAutoPanRafId = null;
    }

    function ensureChipAutoPanLoop() {
        if (sliderChipAutoPanStrength === 0 || sliderChipAutoPanRafId !== null) {
            return;
        }

        sliderChipAutoPanRafId = window.requestAnimationFrame(runChipAutoPanLoop);
    }

    function moveTimelineChipDrag(event) {
        if (sliderChipPointerId !== event.pointerId) {
            return;
        }

        sliderChipDragClientX = event.clientX;
        updateChipAutoPanStrength(event.clientX);
        applyChipDragAtClientX(event.clientX);
        ensureChipAutoPanLoop();
        if (sliderChipAutoPanStrength === 0) {
            stopChipAutoPanLoop();
        }
        event.preventDefault();
    }

    function endTimelineChipDrag(event) {
        if (!sliderLiveChip || sliderChipPointerId !== event.pointerId) {
            return;
        }

        sliderChipPointerId = null;
        stopChipAutoPanLoop();
        sliderLiveChip.classList.remove('is-dragging');
        if (sliderLiveChip.hasPointerCapture(event.pointerId)) {
            sliderLiveChip.releasePointerCapture(event.pointerId);
        }
    }

    function parseUtcTimezoneLabel(timezoneLabel) {
        const match = (timezoneLabel || '').match(/^UTC([+-])(\d{2}):(\d{2})$/);
        if (!match) {
            return null;
        }

        return {
            sign: match[1] === '-' ? -1 : 1,
            hours: parseInt(match[2], 10),
            minutes: parseInt(match[3], 10)
        };
    }

    function normalizeCountryLabel(countryLabel) {
        return String(countryLabel || '')
            .toLowerCase()
            .replace(/[^a-z\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getIanaTimezoneForOffset(utcOffset, countryLabel) {
        const timezones = utcOffsetToTimezones[utcOffset];
        if (!timezones || timezones.length === 0) {
            return null;
        }

        const normalizedCountry = normalizeCountryLabel(countryLabel);

        // Country/region-aware overrides to avoid incorrect abbreviations when
        // multiple locations share the same UTC offset.
        if (normalizedCountry) {
            // ── Oceania high-offset disambiguation ──────────────────────────
            if ((utcOffset === 'UTC+12:00' || utcOffset === 'UTC+13:00') &&
                (normalizedCountry.includes('new zealand') || normalizedCountry === 'nz')) {
                return 'Pacific/Auckland';
            }
            if (utcOffset === 'UTC+12:45' && normalizedCountry.includes('chatham')) {
                return 'Pacific/Chatham';
            }
            if ((utcOffset === 'UTC+12:00' || utcOffset === 'UTC+13:00') && normalizedCountry.includes('fiji')) {
                return 'Pacific/Fiji';
            }

            // ── UTC+00:00 ────────────────────────────────────────────────────
            if (utcOffset === 'UTC+00:00') {
                if (normalizedCountry.includes('ireland')) {
                    return 'Europe/Dublin';
                }
                if (normalizedCountry.includes('united kingdom') || normalizedCountry.includes('england') ||
                    normalizedCountry.includes('scotland') || normalizedCountry.includes('wales') ||
                    normalizedCountry.includes('great britain')) {
                    return 'Europe/London';
                }
                if (normalizedCountry.includes('morocco')) {
                    return 'Africa/Casablanca';
                }
                if (normalizedCountry.includes('iceland')) {
                    return 'Atlantic/Reykjavik';
                }
            }

            // ── UTC+01:00 — African countries use WAT (no DST) ───────────────
            if (utcOffset === 'UTC+01:00') {
                const watCountries = ['nigeria', 'cameroon', 'angola', 'gabon', 'congo',
                    'niger', 'chad', 'algeria', 'tunisia', 'benin', 'equatorial guinea',
                    'central african', 'sao tome'];
                if (watCountries.some(function(n) { return normalizedCountry.includes(n); })) {
                    return 'Africa/Lagos';
                }
            }

            // ── UTC+02:00 ────────────────────────────────────────────────────
            if (utcOffset === 'UTC+02:00') {
                if (normalizedCountry.includes('egypt')) {
                    return 'Africa/Cairo';
                }
                if (normalizedCountry.includes('israel') || normalizedCountry.includes('palestine')) {
                    return 'Asia/Jerusalem';
                }
                if (normalizedCountry.includes('lebanon')) {
                    return 'Asia/Beirut';
                }
                if (normalizedCountry.includes('greece') || normalizedCountry.includes('hellas')) {
                    return 'Europe/Athens';
                }
                if (normalizedCountry.includes('finland') || normalizedCountry.includes('estonia') ||
                    normalizedCountry.includes('latvia') || normalizedCountry.includes('lithuania')) {
                    return 'Europe/Helsinki';
                }
                if (normalizedCountry.includes('romania') || normalizedCountry.includes('bulgaria') ||
                    normalizedCountry.includes('moldova')) {
                    return 'Europe/Bucharest';
                }
                if (normalizedCountry.includes('ukraine')) {
                    return 'Europe/Kiev';
                }
                // Southern/Central African countries at UTC+02 — no DST
                const satCountries = ['zimbabwe', 'zambia', 'mozambique', 'botswana',
                    'malawi', 'lesotho', 'eswatini', 'swaziland', 'rwanda', 'burundi'];
                if (satCountries.some(function(n) { return normalizedCountry.includes(n); })) {
                    return 'Africa/Johannesburg';
                }
                if (normalizedCountry.includes('south africa')) {
                    return 'Africa/Johannesburg';
                }
            }

            // ── UTC+03:00 ────────────────────────────────────────────────────
            if (utcOffset === 'UTC+03:00') {
                const eatCountries = ['kenya', 'tanzania', 'ethiopia', 'somalia',
                    'uganda', 'eritrea', 'djibouti', 'madagascar'];
                if (eatCountries.some(function(n) { return normalizedCountry.includes(n); })) {
                    return 'Africa/Nairobi';
                }
                if (normalizedCountry.includes('iraq')) {
                    return 'Asia/Baghdad';
                }
                if (normalizedCountry.includes('saudi') || normalizedCountry.includes('kuwait') ||
                    normalizedCountry.includes('bahrain') || normalizedCountry.includes('qatar') ||
                    normalizedCountry.includes('yemen')) {
                    return 'Asia/Riyadh';
                }
                if (normalizedCountry.includes('russia') || normalizedCountry.includes('moscow')) {
                    return 'Europe/Moscow';
                }
            }

            // ── UTC-03:00 ────────────────────────────────────────────────────
            if (utcOffset === 'UTC-03:00') {
                if (normalizedCountry.includes('argentina')) {
                    return 'America/Argentina/Buenos_Aires';
                }
                if (normalizedCountry.includes('brazil')) {
                    return 'America/Sao_Paulo';
                }
            }

            // ── UTC-04:00 ────────────────────────────────────────────────────
            if (utcOffset === 'UTC-04:00') {
                if (normalizedCountry.includes('venezuela')) {
                    return 'America/Caracas';
                }
            }

            // ── UTC+08:00 ────────────────────────────────────────────────────
            if ((normalizedCountry.includes('western australia') || normalizedCountry === 'wa') && utcOffset === 'UTC+08:00') {
                return 'Australia/Perth';
            }
            if (normalizedCountry.includes('queensland') && utcOffset === 'UTC+10:00') {
                return 'Australia/Brisbane';
            }
            if ((normalizedCountry.includes('new south wales') || normalizedCountry.includes('victoria')) && utcOffset === 'UTC+10:00') {
                return 'Australia/Sydney';
            }
            if (normalizedCountry.includes('south australia') && utcOffset === 'UTC+09:30') {
                return 'Australia/Adelaide';
            }
            if (normalizedCountry.includes('northern territory') && utcOffset === 'UTC+09:30') {
                return 'Australia/Darwin';
            }

            if (normalizedCountry.includes('south africa') && utcOffset === 'UTC+02:00') {
                return 'Africa/Johannesburg';
            }

            if (normalizedCountry.includes('australia') && utcOffset === 'UTC+08:00') {
                return 'Australia/Perth';
            }
            if (normalizedCountry.includes('australia') && utcOffset === 'UTC+10:00') {
                // Prefer Queensland-style no-DST default for this offset unless
                // a specific DST state (NSW/VIC) was identified above.
                return 'Australia/Brisbane';
            }
        }

        return timezones[0];
    }

    function getTimezoneAbbreviation(ianaTimezone, now) {
        if (!ianaTimezone) {
            return '';
        }

        const date = now || new Date();

        // Primary: use Intl — it is DST-aware by definition.
        // 'short' gives named abbreviations (PDT, BST, IST …) when the browser
        // knows them; generic GMT±N only for zones without a common short name.
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: ianaTimezone,
                timeZoneName: 'short'
            });
            const parts = formatter.formatToParts(date);
            const tzPart = parts.find(function(p) { return p.type === 'timeZoneName'; });
            const abbr = tzPart ? tzPart.value : '';
            if (abbr && !abbr.match(/^GMT[+-]\d/)) {
                return abbr;
            }
        } catch (e) {
            // ignore — fall through to table lookup
        }

        // Fallback: hardcoded table with reliable DST detection
        if (ianaTimezoneAbbreviations[ianaTimezone]) {
            const abbrs = ianaTimezoneAbbreviations[ianaTimezone];
            if (abbrs.std === abbrs.dst) {
                return abbrs.std;
            }
            try {
                const jan = new Date(date.getFullYear(), 0, 1);
                const jul = new Date(date.getFullYear(), 6, 1);
                const janOffset = getTimezoneOffsetMs(ianaTimezone, jan);
                const julOffset = getTimezoneOffsetMs(ianaTimezone, jul);
                if (janOffset === julOffset) {
                    return abbrs.std;
                }
                const dstOffset = Math.max(janOffset, julOffset);
                const currentOffset = getTimezoneOffsetMs(ianaTimezone, date);
                return currentOffset === dstOffset ? abbrs.dst : abbrs.std;
            } catch (e) {
                return abbrs.std;
            }
        }

        return '';
    }

    // Returns the UTC offset in milliseconds for an IANA timezone at a given date.
    // Compares the timezone's local date/time parts against the real UTC parts —
    // fully DST-aware and reliable across all browsers that support Intl.
    function getTimezoneOffsetMs(ianaTimezone, date) {
        try {
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: ianaTimezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const parts = formatter.formatToParts(date);
            const get = function(type) {
                const part = parts.find(function(p) { return p.type === type; });
                return part ? parseInt(part.value, 10) : 0;
            };
            const tzMs = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
            const utcMs = Date.UTC(
                date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
            );
            return tzMs - utcMs;
        } catch (e) {
            return 0;
        }
    }

    function getActualUtcOffsetLabel(ianaTimezone, date) {
        if (!ianaTimezone) {
            return '';
        }
        try {
            const offsetMs = getTimezoneOffsetMs(ianaTimezone, date || new Date());
            const totalMinutes = Math.round(offsetMs / 60000);
            const sign = totalMinutes >= 0 ? '+' : '-';
            const abs = Math.abs(totalMinutes);
            const h = String(Math.floor(abs / 60)).padStart(2, '0');
            const m = String(abs % 60).padStart(2, '0');
            return 'UTC' + sign + h + ':' + m;
        } catch (e) {
            return '';
        }
    }

    function getCurrentTimeForTimezone(timezoneLabel, now) {
        const parsed = parseUtcTimezoneLabel(timezoneLabel);
        if (!parsed) {
            return '--:--:--';
        }

        const referenceDate = now || new Date();
        const offsetMinutes = parsed.sign * ((parsed.hours * 60) + parsed.minutes);
        const targetDate = new Date(referenceDate.getTime() + (offsetMinutes * 60000));

        const year = targetDate.getUTCFullYear();
        const month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
        const date = String(targetDate.getUTCDate()).padStart(2, '0');
        const hour24 = targetDate.getUTCHours();
        const amPm = hour24 >= 12 ? 'PM' : 'AM';
        const hour12 = hour24 % 12 || 12;
        const hours = String(hour12).padStart(2, '0');
        const minutes = String(targetDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(targetDate.getUTCSeconds()).padStart(2, '0');

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${amPm}`;
    }

    // Uses the Intl API with an IANA timezone identifier so DST transitions are
    // handled automatically — no manual offset calculation required.
    function getCurrentTimeForIanaTimezone(ianaTimezone, now) {
        const date = now || new Date();
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: ianaTimezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const parts = formatter.formatToParts(date);
            const get = function(type) {
                const part = parts.find(function(p) { return p.type === type; });
                return part ? part.value : '00';
            };
            const year = get('year');
            const month = get('month');
            const day = get('day');
            const hour = get('hour');
            const minute = get('minute');
            const second = get('second');
            const dayPeriod = get('dayPeriod').toUpperCase();
            return `${year}-${month}-${day} ${hour}:${minute}:${second} ${dayPeriod}`;
        } catch (e) {
            return '--:--:--';
        }
    }

    function updatePinTimes() {
        const now = getClockNow();
        document.querySelectorAll('.pin-time').forEach(function(node) {
            const ianaTimezone = node.getAttribute('data-iana-timezone') || '';
            if (ianaTimezone) {
                node.textContent = getCurrentTimeForIanaTimezone(ianaTimezone, now);
            } else {
                const timezoneLabel = node.getAttribute('data-timezone') || '';
                node.textContent = getCurrentTimeForTimezone(timezoneLabel, now);
            }
        });

        // Update UTC offset labels (DST-aware)
        document.querySelectorAll('.pin-utc-offset').forEach(function(node) {
            const ianaTimezone = node.getAttribute('data-iana-timezone') || '';
            if (ianaTimezone) {
                node.textContent = getActualUtcOffsetLabel(ianaTimezone, now);
            }
        });

        // Update abbreviations if they might have changed (DST transitions)
        document.querySelectorAll('.pin-abbr').forEach(function(node) {
            const ianaTimezone = node.getAttribute('data-iana-timezone') || '';
            node.textContent = getTimezoneAbbreviation(ianaTimezone, now);
        });
    }
    function formatUtcTimestamp(now) {
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const date = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds} UTC`;
    }

    function formatLocalTimestamp(timezoneLabel, now, ianaTimezone) {
        const referenceDate = now || new Date();

        // If we have an IANA timezone, use Intl for DST-correct output.
        if (ianaTimezone) {
            try {
                const formatter = new Intl.DateTimeFormat('en-CA', {
                    timeZone: ianaTimezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                const parts = formatter.formatToParts(referenceDate);
                const get = function(type) {
                    const part = parts.find(function(p) { return p.type === type; });
                    return part ? part.value : '00';
                };
                const dateStr = `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
                const offsetLabel = getActualUtcOffsetLabel(ianaTimezone, referenceDate);
                const abbr = getTimezoneAbbreviation(ianaTimezone, referenceDate);
                const suffix = abbr ? `${abbr} (${offsetLabel})` : offsetLabel;
                return `${dateStr} ${suffix}`;
            } catch (e) {
                // fall through to offset-based path
            }
        }

        // Fallback: use the static UTC offset label.
        const parsed = parseUtcTimezoneLabel(timezoneLabel);
        if (!parsed) {
            return 'N/A';
        }

        const offsetMinutes = parsed.sign * ((parsed.hours * 60) + parsed.minutes);
        const targetDate = new Date(referenceDate.getTime() + (offsetMinutes * 60000));

        const year = targetDate.getUTCFullYear();
        const month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
        const date = String(targetDate.getUTCDate()).padStart(2, '0');
        const hours = String(targetDate.getUTCHours()).padStart(2, '0');
        const minutes = String(targetDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(targetDate.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${timezoneLabel}`;
    }

    function formatAllTimestampsForClipboard(now) {
        const referenceDate = now || getClockNow();
        const lines = [formatUtcTimestamp(referenceDate)];

        pins.forEach(function(pin) {
            lines.push(formatLocalTimestamp(pin.timezone, referenceDate, pin.ianaTimezone));
        });

        return lines.join('\n');
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(function(err) {
            console.error('Failed to copy to clipboard:', err);
        });
    }

    function flashMenuActionButton(buttonElement) {
        if (!buttonElement) {
            return;
        }

        const existingTimer = buttonFlashTimers.get(buttonElement);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        buttonElement.classList.add('is-success-flash');

        const timerId = window.setTimeout(function() {
            buttonElement.classList.remove('is-success-flash');
            buttonFlashTimers.delete(buttonElement);
        }, 1000);

        buttonFlashTimers.set(buttonElement, timerId);
    }

    function closeOpenCopyMenus() {
        document.querySelectorAll('.pin-copy-menu.open').forEach(function(menu) {
            menu.classList.remove('open');
        });
    }

    function clearPinDropIndicators() {
        pinList.querySelectorAll('.pin-list-item').forEach(function(item) {
            item.classList.remove('drop-before', 'drop-after', 'is-dragging');
        });
        pinDropTargetIndex = null;
    }

    function getPinDropTargetIndex(clientY) {
        const items = Array.from(pinList.querySelectorAll('.pin-list-item'));
        let targetIndex = pins.length;

        for (const item of items) {
            const itemIndex = Number.parseInt(item.getAttribute('data-pin-index') || '-1', 10);
            if (itemIndex === draggedPinIndex) {
                continue;
            }

            const rect = item.getBoundingClientRect();
            const midpoint = rect.top + (rect.height / 2);
            if (clientY < midpoint) {
                targetIndex = itemIndex;
                break;
            }

            targetIndex = itemIndex + 1;
        }

        return targetIndex;
    }

    function showPinDropIndicator(targetIndex) {
        clearPinDropIndicators();

        const items = Array.from(pinList.querySelectorAll('.pin-list-item'));
        if (!items.length) {
            pinDropTargetIndex = 0;
            return;
        }

        if (targetIndex <= 0) {
            items[0].classList.add('drop-before');
        } else if (targetIndex >= items.length) {
            items[items.length - 1].classList.add('drop-after');
        } else {
            items[targetIndex].classList.add('drop-before');
        }

        pinDropTargetIndex = targetIndex;
    }

    function movePin(fromIndex, toIndex) {
        if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= pins.length || toIndex > pins.length) {
            return;
        }

        const movedPin = pins.splice(fromIndex, 1)[0];
        pins.splice(toIndex, 0, movedPin);
    }

    function createPinCopyButton(pin, index, extraClassName) {
        const copyBtn = document.createElement('button');
        copyBtn.className = extraClassName ? `pin-copy ${extraClassName}` : 'pin-copy';
        copyBtn.setAttribute('aria-label', `Copy time for pin ${index + 1}`);
        copyBtn.innerHTML = '&#128203;';

        const copyMenu = document.createElement('div');
        copyMenu.className = 'pin-copy-menu';

        const copyUtcItem = document.createElement('button');
        copyUtcItem.className = 'pin-copy-item';
        copyUtcItem.textContent = 'Copy UTC';
        copyUtcItem.addEventListener('click', function(event) {
            event.stopPropagation();
            const now = getClockNow();
            copyToClipboard(formatUtcTimestamp(now));
            copyMenu.classList.remove('open');
        });
        copyMenu.appendChild(copyUtcItem);

        const copyLocalItem = document.createElement('button');
        copyLocalItem.className = 'pin-copy-item';
        copyLocalItem.textContent = 'Copy Local';
        copyLocalItem.addEventListener('click', function(event) {
            event.stopPropagation();
            const now = getClockNow();
            copyToClipboard(formatLocalTimestamp(pin.timezone, now, pin.ianaTimezone));
            copyMenu.classList.remove('open');
        });
        copyMenu.appendChild(copyLocalItem);

        copyBtn.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });
        copyBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            const wasOpen = copyMenu.classList.contains('open');
            closeOpenCopyMenus();
            if (!wasOpen) {
                copyMenu.classList.add('open');
            }
        });

        copyBtn.appendChild(copyMenu);
        return copyBtn;
    }

    function updateTopbarVisibility() {
        appHeader.classList.toggle('is-collapsed', !topbarVisible);
        topbarShowButton.classList.toggle('visible', !topbarVisible);
    }

    function setHoveredShape(shapeKey) {
        if (hoveredShapeKey === shapeKey) {
            return;
        }

        if (hoveredShapeKey) {
            document.querySelectorAll(`[data-hover-key="${hoveredShapeKey}"]`).forEach(function(node) {
                node.classList.remove('is-hovered');
            });
        }

        hoveredShapeKey = shapeKey || '';

        if (hoveredShapeKey) {
            document.querySelectorAll(`[data-hover-key="${hoveredShapeKey}"]`).forEach(function(node) {
                node.classList.add('is-hovered');
            });
        }
    }

    function centerLoop() {
        const tileWidth = getTileWidth();
        if (!tileWidth) {
            return;
        }

        mapContainer.scrollLeft = tileWidth;
    }

    function keepLoopCentered() {
        if (isRecentering) {
            return;
        }

        const tileWidth = getTileWidth();
        if (!tileWidth) {
            return;
        }

        const minScroll = tileWidth * 0.5;
        const maxScroll = tileWidth * 1.5;

        isRecentering = true;

        if (mapContainer.scrollLeft < minScroll) {
            mapContainer.scrollLeft += tileWidth;
        } else if (mapContainer.scrollLeft > maxScroll) {
            mapContainer.scrollLeft -= tileWidth;
        }

        isRecentering = false;
    }

    function renderPinList() {
        pinList.innerHTML = '';
        clearPinsButton.disabled = pins.length === 0;
        if (copyAllPinsButton) {
            copyAllPinsButton.disabled = pins.length === 0;
        }
        pins.forEach(function(pin, index) {
            const li = document.createElement('li');
            li.className = 'pin-list-item';
            li.setAttribute('draggable', 'true');
            li.setAttribute('data-pin-index', String(index));

            li.addEventListener('dragstart', function(event) {
                if (event.target.closest('.pin-list-actions')) {
                    event.preventDefault();
                    return;
                }

                draggedPinIndex = index;
                li.classList.add('is-dragging');
                closeOpenCopyMenus();
                if (event.dataTransfer) {
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', String(index));
                }
            });

            li.addEventListener('dragend', function() {
                draggedPinIndex = null;
                clearPinDropIndicators();
            });

            const num = document.createElement('span');
            num.className = 'pin-list-number';
            num.textContent = index + 1;
            li.appendChild(num);

            const meta = document.createElement('div');
            meta.className = 'pin-list-meta';

            const labelSpan = document.createElement('span');
            labelSpan.className = 'pin-list-label';
            labelSpan.textContent = pin.country;
            labelSpan.title = pin.country;
            meta.appendChild(labelSpan);

            const utcOffsetSpan = document.createElement('span');
            utcOffsetSpan.className = 'pin-utc-offset pin-list-utc-offset';
            utcOffsetSpan.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
            utcOffsetSpan.textContent = pin.ianaTimezone
                ? getActualUtcOffsetLabel(pin.ianaTimezone, new Date())
                : pin.timezone;
            meta.appendChild(utcOffsetSpan);

            const timeSpan = document.createElement('span');
            timeSpan.className = 'pin-time pin-list-time';
            timeSpan.setAttribute('data-timezone', pin.timezone);
            timeSpan.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
            meta.appendChild(timeSpan);

            const abbrSpan = document.createElement('span');
            if (!isOceanCountryLabel(pin.country)) {
                abbrSpan.className = 'pin-abbr pin-list-abbr';
                abbrSpan.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
                abbrSpan.textContent = getTimezoneAbbreviation(pin.ianaTimezone, new Date());
                meta.appendChild(abbrSpan);
            }

            li.appendChild(meta);

            const actions = document.createElement('div');
            actions.className = 'pin-list-actions';

            const copyBtn = createPinCopyButton(pin, index, 'pin-list-copy');
            actions.appendChild(copyBtn);

            const delBtn = document.createElement('button');
            delBtn.className = 'pin-list-delete';
            delBtn.setAttribute('aria-label', `Delete pin ${index + 1}`);
            delBtn.textContent = '\u00d7';
            delBtn.addEventListener('click', function() {
                pins.splice(index, 1);
                if (!pins.length) {
                    updateSelectedCountry('No country selected', '');
                }
                renderPins();
            });
            actions.appendChild(delBtn);

            li.appendChild(actions);

            pinList.appendChild(li);
        });
    }

    pinList.addEventListener('dragover', function(event) {
        if (draggedPinIndex === null) {
            return;
        }

        event.preventDefault();
        const targetIndex = getPinDropTargetIndex(event.clientY);
        showPinDropIndicator(targetIndex);
    });

    pinList.addEventListener('dragleave', function(event) {
        const related = event.relatedTarget;
        if (!(related instanceof Node) || !pinList.contains(related)) {
            clearPinDropIndicators();
        }
    });

    pinList.addEventListener('drop', function(event) {
        event.preventDefault();
        if (draggedPinIndex === null) {
            clearPinDropIndicators();
            return;
        }

        const rawTargetIndex = pinDropTargetIndex !== null ? pinDropTargetIndex : getPinDropTargetIndex(event.clientY);
        let targetIndex = rawTargetIndex;

        if (draggedPinIndex < targetIndex) {
            targetIndex -= 1;
        }

        movePin(draggedPinIndex, targetIndex);
        draggedPinIndex = null;
        clearPinDropIndicators();
        renderPins();
    });

    function getNormalizedPointInSvg(svg, clientX, clientY) {
        if (!svg) {
            return null;
        }

        if (!svg.createSVGPoint) {
            const rect = svg.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return null;
            }

            return {
                xNorm: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
                yNorm: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
            };
        }

        const ctm = svg.getScreenCTM();
        const viewBox = svg.viewBox && svg.viewBox.baseVal;
        if (!ctm || !viewBox || !viewBox.width || !viewBox.height) {
            const rect = svg.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return null;
            }

            return {
                xNorm: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
                yNorm: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
            };
        }

        const point = svg.createSVGPoint();
        point.x = clientX;
        point.y = clientY;
        const localPoint = point.matrixTransform(ctm.inverse());
        const xNorm = (localPoint.x - viewBox.x) / viewBox.width;
        const yNorm = (localPoint.y - viewBox.y) / viewBox.height;

        return {
            xNorm: Math.max(0, Math.min(1, xNorm)),
            yNorm: Math.max(0, Math.min(1, yNorm))
        };
    }

    function renderPins() {
        mapTiles.forEach(function(tile) {
            const pinLayer = tile.querySelector('.pin-layer');
            pinLayer.innerHTML = '';

            pins.forEach(function(pin, index) {
                const pinElement = document.createElement('div');
                pinElement.className = 'map-pin';
                let xPercent = pin.xPercent;
                let yPercent = pin.yPercent;

                if (Number.isFinite(pin.xNorm) && Number.isFinite(pin.yNorm)) {
                    xPercent = Math.max(0, Math.min(100, pin.xNorm * 100));
                    yPercent = Math.max(0, Math.min(100, pin.yNorm * 100));
                }

                pinElement.style.left = `${xPercent}%`;
                pinElement.style.top = `${yPercent}%`;

                const callout = document.createElement('div');
                callout.className = 'pin-callout';

                const num = document.createElement('span');
                num.className = 'pin-num';
                num.textContent = index + 1;
                callout.appendChild(num);

                const meta = document.createElement('span');
                meta.className = 'pin-meta';

                const text = document.createElement('span');
                text.className = 'pin-text';
                text.textContent = pin.country;
                meta.appendChild(text);

                const utcOffset = document.createElement('span');
                utcOffset.className = 'pin-utc-offset';
                utcOffset.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
                utcOffset.textContent = pin.ianaTimezone
                    ? getActualUtcOffsetLabel(pin.ianaTimezone, new Date())
                    : pin.timezone;
                meta.appendChild(utcOffset);

                const time = document.createElement('span');
                time.className = 'pin-time';
                time.setAttribute('data-timezone', pin.timezone);
                time.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
                meta.appendChild(time);

                const abbr = document.createElement('span');
                if (!isOceanCountryLabel(pin.country)) {
                    abbr.className = 'pin-abbr';
                    abbr.setAttribute('data-iana-timezone', pin.ianaTimezone || '');
                    abbr.textContent = getTimezoneAbbreviation(pin.ianaTimezone, new Date());
                    meta.appendChild(abbr);
                }

                callout.appendChild(meta);

                const copyBtn = createPinCopyButton(pin, index, '');
                callout.appendChild(copyBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'pin-delete';
                deleteBtn.setAttribute('aria-label', `Delete pin ${index + 1}`);
                deleteBtn.textContent = '\u00d7';
                deleteBtn.addEventListener('pointerdown', function(event) {
                    event.stopPropagation();
                });
                deleteBtn.addEventListener('click', function(event) {
                    event.stopPropagation();
                    pins.splice(index, 1);
                    if (!pins.length) {
                        updateSelectedCountry('No country selected', '');
                    }
                    renderPins();
                });
                callout.appendChild(deleteBtn);

                pinElement.appendChild(callout);

                const stem = document.createElement('div');
                stem.className = 'pin-stem';
                pinElement.appendChild(stem);

                const dot = document.createElement('div');
                dot.className = 'pin-dot';
                pinElement.appendChild(dot);

                pinLayer.appendChild(pinElement);
            });
        });

        renderPinList();

        updateSelectedCountry(selectedCountry, selectedTimezone);
        initializeStaticTimelineDayBlocks(new Date());
        updateSliderDatetimeLabel();
        updateClockToggleButton();
        updateBrowserClock();
        updateTopbarVisibility();
        persistPinsToCookie();
    }

    function dropPin(svg, target, clientX, clientY) {
        if (!svg || !target) {
            return;
        }

        const normalizedPoint = getNormalizedPointInSvg(svg, clientX, clientY);
        if (!normalizedPoint) {
            return;
        }

        const xPercent = normalizedPoint.xNorm * 100;
        const yPercent = normalizedPoint.yNorm * 100;
        const countryLabel = target.getAttribute('data-country-label') || 'Ocean';
        const timezoneLabel = inferTimezoneFromPoint(svg, target, clientX, clientY, xPercent);
        const ianaTimezone = isOceanCountryLabel(countryLabel)
            ? ''
            : getIanaTimezoneForOffset(timezoneLabel, countryLabel);
        const label = `${countryLabel} (${timezoneLabel})`;

        pins.push({
            xPercent: Math.max(0, Math.min(100, xPercent)),
            yPercent: Math.max(0, Math.min(100, yPercent)),
            xNorm: normalizedPoint.xNorm,
            yNorm: normalizedPoint.yNorm,
            country: countryLabel,
            timezone: timezoneLabel,
            ianaTimezone: ianaTimezone,
            label: label
        });
        updateSelectedCountry(countryLabel, timezoneLabel);
        renderPins();
    }

    function hydrateCountryShapes(svg) {
        let hoverShapeIndex = 0;

        svg.querySelectorAll('*').forEach(function(node) {
            if (!isHoverableCountryShape(node)) {
                return;
            }

            node.dataset.hoverKey = `shape-${hoverShapeIndex}`;
            hoverShapeIndex += 1;
            node.classList.add('country-shape');

            const identity = getCountryIdentity(node);
            if (!identity) {
                return;
            }

            node.dataset.countryKey = identity.key;
            node.dataset.countryLabel = identity.label;
        });
    }

    function attachSvgBehavior(svg) {
        const rawWidth = Number.parseFloat(svg.getAttribute('width') || '0');
        const rawHeight = Number.parseFloat(svg.getAttribute('height') || '0');
        const existingViewBox = svg.getAttribute('viewBox');

        if (!existingViewBox && rawWidth > 0 && rawHeight > 0) {
            svg.setAttribute('viewBox', `0 0 ${rawWidth} ${rawHeight}`);
        }

        // Some source SVGs include thin horizontal gutters at the edges.
        // Trim those gutters from the viewBox so repeated tiles stitch cleanly.
        if (rawWidth > 0 && rawHeight > 0) {
            try {
                const contentBox = svg.getBBox();
                if (contentBox && Number.isFinite(contentBox.x) && Number.isFinite(contentBox.width)) {
                    const leftTrim = Math.max(0, Math.floor(contentBox.x));
                    const rightTrim = Math.max(0, Math.floor(rawWidth - (contentBox.x + contentBox.width)));
                    if (leftTrim > 0 || rightTrim > 0) {
                        const croppedWidth = Math.max(1, Math.round(rawWidth - leftTrim - rightTrim));
                        svg.setAttribute('viewBox', `${leftTrim} 0 ${croppedWidth} ${rawHeight}`);
                    }
                }
            } catch (e) {
                // If getBBox is unavailable for any reason, keep the fallback viewBox.
            }
        }

        const normalizedViewBox = svg.viewBox && svg.viewBox.baseVal;
        if (normalizedViewBox && normalizedViewBox.width > 0 && normalizedViewBox.height > 0) {
            mapAspectRatio = normalizedViewBox.width / normalizedViewBox.height;
        }

        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        hydrateCountryShapes(svg);
        svg.addEventListener('mouseover', function(event) {
            const target = event.target.closest('[data-hover-key]');
            if (!target) {
                return;
            }

            setHoveredShape(target.getAttribute('data-hover-key'));
        });
        svg.addEventListener('mouseleave', function() {
            setHoveredShape('');
        });
    }

    function hydrateTiles(markup) {
        mapTiles.forEach(function(tile) {
            const host = tile.querySelector('.svg-host');
            host.innerHTML = markup;
            const svg = host.querySelector('svg');

            if (svg) {
                attachSvgBehavior(svg);
            }
        });

        invalidateMapProjection();
        updateMapTileGeometry();
        renderPins();
        centerLoop();
    }

    function loadMap() {
        const themeUrl = themeMap[currentTheme] || '/static/world_timezones.svg';
        return fetch(themeUrl).then(function(response) {
            return response.text();
        }).then(function(markup) {
            svgMarkup = markup;
            hydrateTiles(svgMarkup);
        });
    }

    mapContainer.addEventListener('scroll', keepLoopCentered);


    mapContainer.addEventListener('wheel', function(event) {
        // Always zoom in/out with mouse wheel (vertical scroll)
        // Ctrl+wheel: prevent browser zoom
        if (event.ctrlKey) {
            event.preventDefault();
            return;
        }

        // Only zoom if vertical scroll is dominant
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            const zoomDirection = event.deltaY < 0 ? 1 : -1;
            const zoomStep = event.shiftKey ? mapZoomStep * 2 : mapZoomStep;
            const baseZoom = pendingWheelZoomValue !== null ? pendingWheelZoomValue : mapZoom;
            pendingWheelZoomValue = clampMapZoom(baseZoom + (zoomDirection * zoomStep));
            pendingWheelZoomClientX = event.clientX;
            pendingWheelZoomClientY = event.clientY;

            if (wheelZoomRafId === null) {
                wheelZoomRafId = window.requestAnimationFrame(function() {
                    wheelZoomRafId = null;
                    if (pendingWheelZoomValue === null) {
                        return;
                    }

                    const zoomToApply = pendingWheelZoomValue;
                    pendingWheelZoomValue = null;
                    setMapZoom(zoomToApply, {
                        clientX: pendingWheelZoomClientX,
                        clientY: pendingWheelZoomClientY
                    });
                });
            }
        }
        // Optionally: allow horizontal scroll to pan left/right if needed
        // else if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        //     mapContainer.scrollLeft += event.deltaX;
        //     keepLoopCentered();
        // }
    }, { passive: false });

    function getCountryFromPoint(clientX, clientY, fallbackTarget) {
        const directMatch = fallbackTarget ? fallbackTarget.closest('[data-country-key]') : null;
        if (directMatch) {
            return directMatch;
        }

        const layers = document.elementsFromPoint(clientX, clientY);
        for (const layer of layers) {
            const candidate = layer.closest ? layer.closest('[data-country-key]') : null;
            if (candidate) {
                return candidate;
            }
        }

        return null;
    }

    function getSvgFromPoint(clientX, clientY, fallbackTarget) {
        if (fallbackTarget && fallbackTarget.ownerSVGElement) {
            return fallbackTarget.ownerSVGElement;
        }

        if (fallbackTarget && fallbackTarget.closest) {
            const directSvg = fallbackTarget.closest('svg');
            if (directSvg) {
                return directSvg;
            }
        }

        const layers = document.elementsFromPoint(clientX, clientY);
        for (const layer of layers) {
            if (!layer) {
                continue;
            }

            if (layer.ownerSVGElement) {
                return layer.ownerSVGElement;
            }

            if (layer.closest) {
                const candidateSvg = layer.closest('svg');
                if (candidateSvg) {
                    return candidateSvg;
                }
            }
        }

        return null;
    }

    mapContainer.addEventListener('pointerdown', function(event) {
        if (event.button !== 0) {
            return;
        }
        if (event.target instanceof Element && event.target.closest('.map-zoom-controls')) {
            return;
        }

        activePointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        dragStartScrollLeft = mapContainer.scrollLeft;
        dragStartScrollTop = mapContainer.scrollTop;
        latestDragClientX = event.clientX;
        latestDragClientY = event.clientY;
        suppressClick = false;
        pointerDownCountry = getCountryFromPoint(event.clientX, event.clientY, event.target);
        setMapInteractionActive(true);
        mapTiles.forEach(function(tile) {
            tile.classList.add('is-dragging');
        });
        mapContainer.setPointerCapture(event.pointerId);
    });

    function runDragPanFrame() {
        dragRafId = null;
        if (activePointerId === null) {
            return;
        }

        const deltaX = latestDragClientX - dragStartX;
        const deltaY = latestDragClientY - dragStartY;

        mapContainer.scrollLeft = dragStartScrollLeft - deltaX;
        if (mapZoom > 1) {
            mapContainer.scrollTop = dragStartScrollTop - deltaY;
        }
        keepLoopCentered();
    }

    mapContainer.addEventListener('pointermove', function(event) {
        if (activePointerId !== event.pointerId) {
            return;
        }

        const deltaX = event.clientX - dragStartX;
        const deltaY = event.clientY - dragStartY;
        if (Math.abs(deltaX) > 4 || (mapZoom > 1 && Math.abs(deltaY) > 4)) {
            suppressClick = true;
        }

        latestDragClientX = event.clientX;
        latestDragClientY = event.clientY;

        if (dragRafId === null) {
            dragRafId = window.requestAnimationFrame(runDragPanFrame);
        }
    });

    function endDrag(event) {
        if (activePointerId !== event.pointerId) {
            return;
        }

        const pointerEndedCountry = getCountryFromPoint(event.clientX, event.clientY, event.target);
        if (!suppressClick) {
            const svg = getSvgFromPoint(event.clientX, event.clientY, event.target);
            const dropTarget = pointerEndedCountry || pointerDownCountry || event.target;
            if (svg && dropTarget) {
                dropPin(svg, dropTarget, event.clientX, event.clientY);
            }
        }

        activePointerId = null;
        pointerDownCountry = null;
        if (dragRafId !== null) {
            window.cancelAnimationFrame(dragRafId);
            dragRafId = null;
        }
        mapTiles.forEach(function(tile) {
            tile.classList.remove('is-dragging');
        });
        if (mapContainer.hasPointerCapture(event.pointerId)) {
            mapContainer.releasePointerCapture(event.pointerId);
        }
        suppressClick = false;
        setMapInteractionActive(false);
    }

    mapContainer.addEventListener('pointerup', endDrag);
    mapContainer.addEventListener('pointercancel', endDrag);

    topbarHideButton.addEventListener('click', function() {
        topbarVisible = false;
        updateTopbarVisibility();
    });

    if (themeToggleButton && themeDropdown) {
        themeToggleButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const wasOpen = themeDropdown.hidden;
            themeDropdown.hidden = !wasOpen;
            themeToggleButton.setAttribute('aria-expanded', String(wasOpen));
        });

        themeDropdown.addEventListener('click', function(event) {
            const option = event.target.closest('.theme-option');
            if (!option) {
                return;
            }

            const theme = option.getAttribute('data-theme');
            if (theme) {
                applyTheme(theme);
                themeDropdown.hidden = true;
                themeToggleButton.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.theme-selector')) {
                themeDropdown.hidden = true;
                themeToggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (clockToggleButton) {
        clockToggleButton.addEventListener('click', function() {
            setClockPaused(!isClockPaused);
        });
    }

    if (chipCopyToggleButton && chipCopyMenu) {
        chipCopyToggleButton.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });

        chipCopyToggleButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const wasOpen = chipCopyMenu.classList.contains('open');
            closeOpenCopyMenus();
            if (!wasOpen) {
                chipCopyMenu.classList.add('open');
            }
        });
    }

    if (chipCopyMenu) {
        chipCopyMenu.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });
    }

    if (chipCopyLocalButton) {
        chipCopyLocalButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const now = getClockNow();
            const activeTimezone = chipSelectedTimezone || browserResolvedTimezone;
            copyToClipboard(formatLocalTimestamp(activeTimezone, now, activeTimezone));
            closeOpenCopyMenus();
        });
    }

    if (chipCopyUtcButton) {
        chipCopyUtcButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const now = getClockNow();
            copyToClipboard(formatUtcTimestamp(now));
            closeOpenCopyMenus();
        });
    }

    if (chipPinToggleButton) {
        chipPinToggleButton.addEventListener('click', function(event) {
            event.stopPropagation();
            dropPinForSelectedTimezone();
        });
    }

    if (chipEditToggleButton) {
        chipEditToggleButton.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleChipEditPanel();
        });
    }

    if (chipDatetimeApplyButton) {
        chipDatetimeApplyButton.addEventListener('click', function(event) {
            event.stopPropagation();
            applyChipDatetimeInput();
        });
    }

    if (chipDatetimeClearButton) {
        chipDatetimeClearButton.addEventListener('click', function(event) {
            event.stopPropagation();

            // Match the chip play/now button behavior exactly.
            setClockPaused(false);
            closeChipEditPanel();
        });
    }

    if (chipDatetimePrevButton) {
        chipDatetimePrevButton.addEventListener('click', function(event) {
            event.stopPropagation();
            if (!chipPickerDisplayMonth) {
                return;
            }

            chipPickerDisplayMonth = new Date(chipPickerDisplayMonth.getFullYear(), chipPickerDisplayMonth.getMonth() - 1, 1);
            renderChipDatetimePicker();
        });
    }

    if (chipDatetimeNextButton) {
        chipDatetimeNextButton.addEventListener('click', function(event) {
            event.stopPropagation();
            if (!chipPickerDisplayMonth) {
                return;
            }

            chipPickerDisplayMonth = new Date(chipPickerDisplayMonth.getFullYear(), chipPickerDisplayMonth.getMonth() + 1, 1);
            renderChipDatetimePicker();
        });
    }

    if (chipDatetimeDayGrid) {
        chipDatetimeDayGrid.addEventListener('click', function(event) {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }

            const dayButton = target.closest('.chip-datetime-day');
            if (!dayButton) {
                return;
            }

            event.stopPropagation();
            const dateKey = dayButton.getAttribute('data-date');
            const selectedDay = parseDateKey(dateKey);
            if (!selectedDay || !chipPickerSelectedDate) {
                return;
            }

            chipPickerSelectedDate.setFullYear(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
            chipPickerDisplayMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
            renderChipDatetimePicker();
        });
    }

    if (chipDatetimeHourInput) {
        wireTimeInputBehavior(chipDatetimeHourInput, 23);

        chipDatetimeHourInput.addEventListener('change', function() {
            normalizeTimeInputField(chipDatetimeHourInput, 23);
            applyPickerTimeInputs();
        });

        chipDatetimeHourInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyChipDatetimeInput();
            }
        });
    }

    if (chipDatetimeMinuteInput) {
        wireTimeInputBehavior(chipDatetimeMinuteInput, 59);

        chipDatetimeMinuteInput.addEventListener('change', function() {
            normalizeTimeInputField(chipDatetimeMinuteInput, 59);
            applyPickerTimeInputs();
        });

        chipDatetimeMinuteInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyChipDatetimeInput();
            }
        });
    }

    if (chipDatetimeSecondInput) {
        wireTimeInputBehavior(chipDatetimeSecondInput, 59);

        chipDatetimeSecondInput.addEventListener('change', function() {
            normalizeTimeInputField(chipDatetimeSecondInput, 59);
            applyPickerTimeInputs();
        });

        chipDatetimeSecondInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyChipDatetimeInput();
            }
        });
    }

    if (chipTimezoneInput && chipTimezoneDropdown && chipTimezoneList) {
        let chipTimezoneInputSnapshot = '';
        let suppressTimezoneBlurReset = false;

        chipTimezoneInput.addEventListener('focus', function() {
            chipTimezoneInputSnapshot = chipSelectedTimezone || '';
            chipTimezoneInput.value = '';
            chipTimezoneDropdown.hidden = false;
            chipTimezoneInput.setAttribute('aria-expanded', 'true');
            updateChipTimezoneDropdown();
        });

        chipTimezoneInput.addEventListener('input', function() {
            updateChipTimezoneDropdown();
            chipTimezoneDropdown.hidden = false;
            chipTimezoneInput.setAttribute('aria-expanded', 'true');
        });

        chipTimezoneInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (setChipTimezone(chipTimezoneInput.value, { rerenderPicker: true, selectedLabel: chipTimezoneInput.value })) {
                    chipTimezoneInputSnapshot = chipSelectedTimezone;
                } else {
                    chipTimezoneInput.value = chipTimezoneInputSnapshot;
                    updateChipTimezoneInput();
                }
                chipTimezoneDropdown.hidden = true;
                chipTimezoneInput.setAttribute('aria-expanded', 'false');
                chipTimezoneInput.blur();
            } else if (event.key === 'Escape') {
                chipTimezoneInput.value = chipTimezoneInputSnapshot;
                updateChipTimezoneInput();
                chipTimezoneDropdown.hidden = true;
                chipTimezoneInput.setAttribute('aria-expanded', 'false');
                chipTimezoneInput.blur();
            }
        });

        chipTimezoneInput.addEventListener('change', function() {
            if (setChipTimezone(chipTimezoneInput.value, { rerenderPicker: true, selectedLabel: chipTimezoneInput.value })) {
                chipTimezoneInputSnapshot = chipSelectedTimezone;
            }
        });

        chipTimezoneInput.addEventListener('blur', function() {
            setTimeout(function() {
                chipTimezoneDropdown.hidden = true;
                chipTimezoneInput.setAttribute('aria-expanded', 'false');
                if (suppressTimezoneBlurReset) {
                    suppressTimezoneBlurReset = false;
                    return;
                }
                if (chipTimezoneInput.value.trim() === '' || !setChipTimezone(chipTimezoneInput.value, { rerenderPicker: true, selectedLabel: chipTimezoneInput.value })) {
                    chipTimezoneInput.value = chipTimezoneInputSnapshot;
                    updateChipTimezoneInput();
                    updateChipTimezoneDisplay();
                } else {
                    chipTimezoneInputSnapshot = chipSelectedTimezone;
                }
            }, 100);
        });

        // Select before blur resets input, and support clicking text nodes.
        chipTimezoneList.addEventListener('pointerdown', function(event) {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }
            const option = target.closest('.chip-timezone-option');
            if (!option) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            const selectedValue = option.getAttribute('data-timezone') || '';
            const selectedLabel = option.textContent || '';
            suppressTimezoneBlurReset = true;
            if (selectedValue && setChipTimezone(selectedValue, { rerenderPicker: true, selectedLabel: selectedLabel })) {
                chipTimezoneInputSnapshot = chipSelectedTimezone;
            }
            chipTimezoneDropdown.hidden = true;
            chipTimezoneInput.setAttribute('aria-expanded', 'false');
            chipTimezoneInput.blur();
        });

        // Close dropdown when clicking outside.
        document.addEventListener('click', function(event) {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }
            if (!target.closest('.chip-timezone-inline')) {
                chipTimezoneDropdown.hidden = true;
                chipTimezoneInput.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (chipEditPanel) {
        chipEditPanel.addEventListener('click', function(event) {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }

            const stepButton = target.closest('.chip-datetime-step-btn');
            if (!stepButton) {
                return;
            }

            event.stopPropagation();
            const part = stepButton.getAttribute('data-time-part');
            const deltaValue = Number.parseInt(stepButton.getAttribute('data-time-delta') || '0', 10);
            stepPickerTimePart(part, deltaValue);
        });
    }

    function offsetFromRailClientX(clientX) {
        const rect = sliderDaySegments.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const visualOffset = -sliderMinuteRange + fraction * sliderMinuteRange * 2;
        return resolveBaseOffsetFromVisualOffset(visualOffset);
    }

    function offsetFromRailPointer(event) {
        return offsetFromRailClientX(event.clientX);
    }

    if (sliderDaySegments) {
        sliderDaySegments.addEventListener('pointerdown', function(event) {
            if (event.button !== 0) { return; }
            if (event.target instanceof Element && event.target.closest('#slider-live-chip')) { return; }
            railDragPointerId = event.pointerId;
            railDragStartX = event.clientX;
            railDragStartValue = parseSliderOffsetMinutes();
            sliderDaySegments.setPointerCapture(event.pointerId);
            const nextOffset = offsetFromRailPointer(event);
            setSliderOffsetMinutes(nextOffset);
            setClockPaused(true, getSliderTargetDate());
            event.preventDefault();
        });
        sliderDaySegments.addEventListener('pointermove', function(event) {
            if (railDragPointerId !== event.pointerId) { return; }
            const nextOffset = offsetFromRailPointer(event);
            setSliderOffsetMinutes(nextOffset);
            setClockPaused(true, getSliderTargetDate());
            event.preventDefault();
        });
        sliderDaySegments.addEventListener('pointerup', function(event) {
            if (railDragPointerId !== event.pointerId) { return; }
            railDragPointerId = null;
            if (sliderDaySegments.hasPointerCapture(event.pointerId)) {
                sliderDaySegments.releasePointerCapture(event.pointerId);
            }
        });
        sliderDaySegments.addEventListener('pointercancel', function(event) {
            if (railDragPointerId !== event.pointerId) { return; }
            railDragPointerId = null;
        });
        sliderDaySegments.addEventListener('wheel', function(event) {
            const sourceDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.deltaY;
            if (!sourceDelta) {
                return;
            }

            const direction = sourceDelta > 0 ? 1 : -1;
            const wheelSteps = Math.max(1, Math.round(Math.abs(sourceDelta) / 40));
            const minutesShift = direction * wheelSteps * 60;
            shiftTimelineWindow(minutesShift);
            event.preventDefault();
        }, { passive: false });
        updateSliderSegmentationScale();
    }

    if (timelinePanLeftButton) {
        timelinePanLeftButton.addEventListener('click', function() {
            shiftTimelineWindow(-720);
        });
    }

    if (timelinePanRightButton) {
        timelinePanRightButton.addEventListener('click', function() {
            shiftTimelineWindow(720);
        });
    }

    if (sliderLiveChip) {
        sliderLiveChip.addEventListener('pointerdown', startTimelineChipDrag);
        sliderLiveChip.addEventListener('pointermove', moveTimelineChipDrag);
        sliderLiveChip.addEventListener('pointerup', endTimelineChipDrag);
        sliderLiveChip.addEventListener('pointercancel', endTimelineChipDrag);
    }

    topbarShowButton.addEventListener('click', function() {
        topbarVisible = true;
        updateTopbarVisibility();
    });

    if (mapZoomOutButton) {
        mapZoomOutButton.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });
        mapZoomOutButton.addEventListener('click', function(event) {
            event.stopPropagation();
            setMapZoom(mapZoom - mapZoomStep);
        });
    }

    if (mapZoomInButton) {
        mapZoomInButton.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });
        mapZoomInButton.addEventListener('click', function(event) {
            event.stopPropagation();
            setMapZoom(mapZoom + mapZoomStep);
        });
    }

    if (mapZoomResetButton) {
        mapZoomResetButton.addEventListener('pointerdown', function(event) {
            event.stopPropagation();
        });
        mapZoomResetButton.addEventListener('click', function(event) {
            event.stopPropagation();
            setMapZoom(1);
        });
    }

    if (copyAllPinsButton) {
        copyAllPinsButton.addEventListener('click', function() {
            const now = getClockNow();
            copyToClipboard(formatAllTimestampsForClipboard(now));
            flashMenuActionButton(copyAllPinsButton);
        });
    }

    clearPinsButton.addEventListener('click', function() {
        pins.length = 0;
        updateSelectedCountry('No country selected', '');
        renderPins();
        flashMenuActionButton(clearPinsButton);
    });

    document.addEventListener('click', function(event) {
        closeOpenCopyMenus();
        if (!chipEditPanel || !sliderLiveChip || chipEditPanel.hidden) {
            return;
        }

        const eventTarget = event.target;
        if (eventTarget instanceof Element && eventTarget.closest('#slider-live-chip')) {
            return;
        }

        closeChipEditPanel();
    });

    window.addEventListener('resize', function() {
        if (!svgMarkup) {
            return;
        }

        if (resizeDebounceId !== null) {
            window.clearTimeout(resizeDebounceId);
        }

        resizeDebounceId = window.setTimeout(function() {
            resizeDebounceId = null;
            updateMapTileGeometry();
            centerLoop();
        }, 120);
    });

    updateSelectedCountry(selectedCountry, selectedTimezone);
    initializeStaticTimelineDayBlocks(new Date());
    restorePersistedState();
    initializeDatetimeInput();
    updateSliderDatetimeLabel();
    updateClockToggleButton();
    updateBrowserClock();
    updateTopbarVisibility();
    mapContainer.style.setProperty('--map-zoom', String(mapZoom));
    updateMapTileGeometry();
    updateMapZoomUi();
    window.setInterval(function() {
        updateBrowserClock();
        updatePinTimes();
    }, 1000);

    loadMap()
        .then(function() {
            console.log('Interactive Timezone Map loaded');
        })
        .catch(function(error) {
            console.error('Failed to load SVG map', error);
        });
});
