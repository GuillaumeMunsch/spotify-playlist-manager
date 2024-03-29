import {
  AlertDialog,
  Button,
  Flex,
  TextField,
  Checkbox,
  Box,
} from "@radix-ui/themes";
import { Field, Form, Label } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { CreatePlaylistFormValues } from "./CreatePlaylistFormContainer";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (values: CreatePlaylistFormValues) => void;
};

const CreatePlaylistFormView = ({ isOpen, onSubmit, closeModal }: Props) => {
  const { register, formState, handleSubmit } =
    useForm<CreatePlaylistFormValues>({
      defaultValues: {
        shouldRemoveTracksFromLikedTitles: true,
      },
    });
  const { errors } = formState;
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gapY="2" my="4">
            <Field name="playlistName">
              <Label>
                Playlist name
                <TextField.Root
                  {...register("playlistName", { required: true })}
                />
                {errors.playlistName && (
                  <Box style={{ color: "red" }}>Name required</Box>
                )}
              </Label>
            </Field>
            <Field name="shouldRemoveTracksFromLikedTitles">
              <Label>
                <Flex gapX="2" align="center">
                  <Checkbox
                    {...register("shouldRemoveTracksFromLikedTitles")}
                  />
                  <Box>Should remove from Liked Titles</Box>
                </Flex>
              </Label>
            </Field>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button onClick={closeModal} variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button type="submit">Submit</Button>
            </AlertDialog.Action>
          </Flex>
        </Form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CreatePlaylistFormView;
