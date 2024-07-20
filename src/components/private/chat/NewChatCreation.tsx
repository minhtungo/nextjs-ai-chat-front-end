"use client";

import { createNewChatAction } from "@/actions/chat";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECTS_BY_LEVEL } from "@/lib/constant";
import { chatInitialState, chatStore } from "@/store/chat";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import SubmitButton from "../../common/SubmitButton";
import SubjectsRadio from "./SubjectsRadio";
import { Button } from "@/components/ui/button";

interface NewChatCreationProps {
  toggleDialog?: (value: boolean) => void;
}

const NewChatCreation: FC<NewChatCreationProps> = ({ toggleDialog }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  // const {} = useCentrifuge({});

  const { isPending, execute } = useServerAction(createNewChatAction);

  const { setChat } = chatStore();

  useEffect(() => {
    setChat(chatInitialState);
  }, []);

  const createNewChat = async () => {
    if (!selectedSubject) {
      return;
    }

    const [_, error] = await execute({
      subject: selectedSubject,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (toggleDialog) {
      toggleDialog(false);
    }
  };

  return (
    <>
      <Tabs defaultValue={SUBJECTS_BY_LEVEL[0].level}>
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3">
          <TabsList>
            {SUBJECTS_BY_LEVEL.map(({ level }) => (
              <TabsTrigger value={level} key={level}>
                {level}
              </TabsTrigger>
            ))}
          </TabsList>
          <Input
            placeholder="Search subjects"
            className="max-w-[350px] flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {SUBJECTS_BY_LEVEL.map(({ level, subjects }) => (
          <TabsContent value={level} key={`${level}-tab`}>
            <SubjectsRadio
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              subjectsList={subjects.filter(
                (subject) =>
                  subject.value
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  subject.label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
              )}
              isPending={isPending}
              className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3"
            />
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 flex flex-wrap justify-end gap-x-2">
        {toggleDialog && (
          <Button variant={"outline"} onClick={() => toggleDialog(false)}>
            Cancel
          </Button>
        )}
        <SubmitButton
          type="button"
          disabled={!selectedSubject}
          isPending={isPending}
          onClick={createNewChat}
        >
          Create chat
        </SubmitButton>
      </div>
    </>
  );
};

export default NewChatCreation;
