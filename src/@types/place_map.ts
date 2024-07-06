export interface IPlaceMap {
    description: string;
    matched_substrings: Matchedsubstring[];
    place_id: string;
    reference: string;
    structured_formatting: Structuredformatting;
    terms: Term[];
    types: string[];
}

export interface IPlaceMapDetails {
    address_components: Addresscomponent[];
    adr_address: string;
    business_status: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    international_phone_number: string;
    name: string;
    photos: Photo[];
    place_id: string;
    plus_code: Pluscode;
    rating: number;
    reference: string;
    reviews: Review[];
    types: string[];
    url: string;
    user_ratings_total: number;
    utc_offset: number;
    vicinity: string;
    website: string;
}

interface Term {
    offset: number;
    value: string;
}

interface Structuredformatting {
    main_text: string;
    main_text_matched_substrings: any;
    secondary_text: string;
    secondary_text_matched_substrings: any;
}

interface Matchedsubstring {
    length: number;
    offset: number;
}


interface Review {
    author_name: string;
    author_url: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    translated: boolean;
}

interface Pluscode {
    compound_code: string;
    global_code: string;
}

interface Photo {
    height: number;
    html_attributions: any;
    photo_reference: string;
    width: number;
}

interface Geometry {
    location: Location;
    viewport: Viewport;
}

interface Viewport {
    northeast: any;
    southwest: any;
}

interface Location {
    lat: number;
    lng: number;
}

interface Addresscomponent {
    long_name: string;
    short_name: string;
    types: any;
}
