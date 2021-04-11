import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import classes from "./GoogleMap.module.scss";
import { GoogleMaps } from "../../Services";


class GoogleMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: "",
                lng: ""
            },
            place: ""
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.showPosition);
        this.renderAutoComplete();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let center = {...this.state.center};
        if (nextProps.lat && nextProps.long && nextProps.googleAddress) {
            center = {
                lat: nextProps.lat,
                lng: nextProps.long
            };
            this.setState({
                center,
                place: nextProps.googleAddress
            });
        }
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        const { map } = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }

    showPosition = (position) => {
        const center = {...this.state.center};
        center.lat = position.coords.latitude;
        center.lng = position.coords.longitude;
        this.setState({
            center
        })

    }

    renderAutoComplete = () => {
        const { google, map } = this.props;
        if (!google || !map) return;
        const aref = this.autocompleteRef;
        const autocomplete = new google.maps.places.Autocomplete(aref);
        autocomplete.bindTo("bounds", map);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            const center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            this.setState(
                {
                    place: `${place.name  } , ${  place.formatted_address}`,
                    center
                },
                () =>
                    this.props.googleLocationChanged(
                        this.state.place,
                        this.state.center.lat,
                        this.state.center.lng
                    )
            );
        });
    };

    reverseGeoCoding = (lat, lng) => {
        GoogleMaps.reverseGeocode(lat, lng)
            .then(
                response => {
                    this.setState(
                        {
                            place: response.results[0].formatted_address
                        },
                        () =>
                            this.props.googleLocationChanged(
                                this.state.place,
                                this.state.center.lat,
                                this.state.center.lng
                            )
                    );
                },
                error => {
                    // console.log("error");
                    this.setState({
                        place: ""
                    });
                }
            )
            .catch(error =>
                this.setState({
                    place: ""
                })
            );
    };

    GeoCoding = (address) => {
        GoogleMaps.geocode(address)
            .then(
                response => {
                    if (response.results.length) {
                        const center = {
                            lat: response.results[response.results.length - 1].geometry.location.lat,
                            lng: response.results[response.results.length - 1].geometry.location.lng
                        };
                        this.setState({
                            place: response.results[response.results.length - 1].formatted_address,
                            center
                        },()=>{
                            this.props.googleLocationChanged(
                                this.state.place,
                                this.state.center.lat,
                                this.state.center.lng
                            )
                        })
                       
                    }
                },
                error => {
                    this.setState({
                        place: ""
                    });
                }
            )
            .catch(error =>
                this.setState({
                    place: ""
                })
            );
    };

    onMapClicked = (mapProps, map, clickEvent) => {
        this.setState(
            {
                center: {
                    lat: clickEvent.latLng.lat(),
                    lng: clickEvent.latLng.lng()
                },
                latitude: clickEvent.latLng.lat(),
                longitude: clickEvent.latLng.lng()
            },
            () => {
                this.reverseGeoCoding(
                    this.state.center.lat,
                    this.state.center.lng
                );
            }
        );
    };

    onConfirmLocation = () => {
        this.props.confirmMap(
            this.state.place,
            this.state.center.lat,
            this.state.center.lng
        );
        this.props.closeMap();
    };

    handleKeyPress = event => {
        const { google, map } = this.props;
        if (event.key === "Enter") {
            if (event.target.value !== "") {
                const firstResult = event.target.value;
                this.GeoCoding(firstResult);
            }
        }
    };

    render() {
        return (
            <div>
                <div className={classes.Map}>
                    <div className={classes.MapHeader} />
                    <div className={[
                        "GoogleMapContainer",
                        classes.mapContainer
                    ].join(" ")}
                        >
                        <div className={classes.Searchbar}>
                            <input
                                className={classes.searchInput}
                                id="search-location"
                                ref={(c) => { this.autocompleteRef = c; }}
                                type="text"
                                placeholder={"search Location"}
                                style={{
                                    borderRadius: 50,
                                    border: "1px solid rgba(0,0,0,0.5)",
                                    width: "100%",
                                    outline: "none",
                                    height: "40px",
                                    paddingLeft: "40px",
                                    boxSizing: "border-box",
                                    fontSize: "14px"
                                }}
                                onKeyPress={event=>this.handleKeyPress(event)}
                            />
                        </div>
                        <Map
                            google={this.props.google}
                            zoom={15}
                            center={this.state.center}
                            onClick={
                               this.onMapClicked
                            }
                            initialCenter={this.state.center}
                        >
                            <Marker
                                name={"Current location"}
                                position={this.state.center}
                            />
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}
class GoogleMapWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
                lat: "",
                lng: ""
        };
        navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    
    showPosition = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
            lat,
            lng
        })

    }
    
    render() {
        const {props} = this;
        const { google } = this.props;

        let {lat} = this.state;
        let {lng} = this.state;

        if (this.props.lat && this.props.lng) {
            lat = this.props.lat;
            lng = this.props.lng;
        }
        return (
            <Map
                google={google}
                lat={lat}
                long={lng}
                zoom={15}
                googleAddress={this.props.googleAddress}
                className={"map"}
                visible={false}
            >
                <GoogleMapContainer 
                    lat={props.lat}
                    long={props.long}
                    googleAddress={props.googleAddress}
                    googleLocationChanged={props.googleLocationChanged}
                />
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["visualization","places"]
})(GoogleMapWrapper);
