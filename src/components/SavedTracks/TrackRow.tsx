import { Avatar, Checkbox, Table } from "@radix-ui/themes";
import { SelectableTrack } from "./SavedTracksContainer";

type Props = {
  track: SelectableTrack;
};

const TrackRow = ({ track }: Props) => {
  const { date, isSelected, name, imageUrl } = track;
  return (
    <Table.Row align="center">
      <Table.RowHeaderCell>
        <Checkbox checked={isSelected} />
      </Table.RowHeaderCell>
      <Table.Cell>{date.format("DD-MM-YY")}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <Avatar fallback="P" src={imageUrl}></Avatar>
      </Table.Cell>
    </Table.Row>
  );
};

export default TrackRow;
