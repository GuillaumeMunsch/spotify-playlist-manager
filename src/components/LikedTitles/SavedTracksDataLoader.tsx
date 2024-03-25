import { useEffect, useState } from "react";
import { useSpotifySDK } from "../../contexts/SDKContext";
import SavedTracksContainer from "./SavedTracksContainer";
import { SavedTrack } from "@spotify/web-api-ts-sdk";
import Loading from "../Loading";

const useFetchCurrentUserSavedTracks = () => {
  const { sdk } = useSpotifySDK();
  const [isFetching, setIsFetching] = useState(false);
  const [savedTracks, setSavedTracks] = useState<SavedTrack[]>([]);

  useEffect(() => {
    if (sdk) {
      setIsFetching(true);
      sdk?.currentUser.tracks
        .savedTracks()
        .then((tracks) => {
          setSavedTracks(tracks.items);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [sdk]);

  return {
    isFetching,
    savedTracks,
  };
};

const SavedTracksDataLoader = () => {
  const { isFetching, savedTracks } = useFetchCurrentUserSavedTracks();
  console.log("isFetching", isFetching);

  if (isFetching) return <Loading />;

  return <SavedTracksContainer savedTracks={savedTracks} />;
};

export default SavedTracksDataLoader;
