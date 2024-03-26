import { useEffect, useState } from "react";
import { useSpotifySDK } from "../../contexts/SDKContext";
import SavedTracksContainer from "./SavedTracksContainer";
import { MaxInt, Page, SavedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import Loading from "../Loading";

const fetchAllCurrentUserSavedTracks = async ({
  sdk,
  total,
  chunkSize = 50,
}: {
  sdk: SpotifyApi;
  total: number;
  chunkSize?: MaxInt<50>;
}) => {
  const fetchTracksRequests: Promise<Page<SavedTrack>>[] = [];
  for (
    let remainingTracksAmount = total;
    remainingTracksAmount > 0;
    remainingTracksAmount = remainingTracksAmount - chunkSize
  ) {
    const tracksAmountToFetch =
      remainingTracksAmount > chunkSize
        ? chunkSize
        : (remainingTracksAmount as MaxInt<50>);

    fetchTracksRequests.push(
      sdk.currentUser.tracks.savedTracks(
        tracksAmountToFetch,
        fetchTracksRequests.length * chunkSize
      )
    );
  }

  const pages = await Promise.all(fetchTracksRequests);

  const allCurrentUserSavedTracks = pages.reduce<SavedTrack[]>(
    (allItems, page) => [...allItems, ...page.items],
    []
  );

  return allCurrentUserSavedTracks;
};

const useFetchCurrentUserSavedTracks = () => {
  const { sdk } = useSpotifySDK();
  const [isFetching, setIsFetching] = useState(false);
  const [savedTracks, setSavedTracks] = useState<SavedTrack[]>([]);

  useEffect(() => {
    if (sdk) {
      setIsFetching(true);
      fetchAllCurrentUserSavedTracks({
        sdk,
        total: 100,
      })
        .then((tracks) => setSavedTracks(tracks))
        .catch((err) => console.log("Err", err))
        .finally(() => setIsFetching(false));
    }
  }, [sdk]);

  return {
    isFetching,
    savedTracks,
  };
};

const SavedTracksDataLoader = () => {
  const { isFetching, savedTracks } = useFetchCurrentUserSavedTracks();

  if (isFetching) return <Loading />;

  return <SavedTracksContainer savedTracks={savedTracks} />;
};

export default SavedTracksDataLoader;
