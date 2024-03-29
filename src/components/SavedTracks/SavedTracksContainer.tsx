import { SavedTrack } from "@spotify/web-api-ts-sdk";
import SavedTracksView from "./SavedTracksView";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export type SelectableTrack = {
  isSelected: boolean;
  name: string;
  date: Dayjs;
  imageUrl?: string;
  id: string;
  uri: string;
};

type Props = {
  savedTracks: SavedTrack[];
};

const SavedTracksContainer = ({ savedTracks }: Props) => {
  const [tracks, setTracks] = useState(
    savedTracks
      .map<SelectableTrack>(({ track, added_at }) => ({
        id: track.id,
        date: dayjs(added_at),
        isSelected: false,
        name: track.name,
        imageUrl: track.album.images[0].url ?? undefined,
        uri: track.uri,
      }))
      .reverse()
  );

  const selectFirstBatch = () => {
    setTracks(
      tracks.map((track, index) =>
        index < 100 ? { ...track, isSelected: true } : track
      )
    );
  };

  return (
    <SavedTracksView tracks={tracks} selectFirstBatch={selectFirstBatch} />
  );
};

export default SavedTracksContainer;
