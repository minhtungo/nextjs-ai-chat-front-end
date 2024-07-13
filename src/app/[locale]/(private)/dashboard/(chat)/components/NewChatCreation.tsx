"use client";

import { createNewChatAction } from "@/actions/chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECTS_BY_LEVEL } from "@/lib/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import SubjectsRadio from "./SubjectsRadio";

const NewChatCreation = () => {
  const { isPending, execute } = useServerAction(createNewChatAction);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const createNewChat = async (subject: string) => {
    setSelectedSubject(subject);

    const [_, error] = await execute({
      subject,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <Tabs defaultValue={SUBJECTS_BY_LEVEL[0].level}>
      <TabsList className="mb-4">
        {SUBJECTS_BY_LEVEL.map(({ level }) => (
          <TabsTrigger value={level} key={level}>
            {level}
          </TabsTrigger>
        ))}
      </TabsList>
      {SUBJECTS_BY_LEVEL.map(({ level, subjects }) => (
        <TabsContent value={level} key={`${level}-tab`}>
          <SubjectsRadio
            selectedSubject={selectedSubject}
            onChange={createNewChat}
            subjectsList={subjects}
            isPending={isPending}
            className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default NewChatCreation;
