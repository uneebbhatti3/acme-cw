"use client";

import { IconArchive, IconInboxOff, IconMail, IconMailOpened, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { adminCopy } from "@/features/admin/data/copy";
import type { StoredEnquiry } from "@/features/admin/types";

const c = adminCopy.enquiries;

/** Reply, read state, archive and delete for one enquiry. UI only: only the reply link and the dialog do anything. */
export function EnquiryActions({ enquiry, replySubject }: { enquiry: StoredEnquiry; replySubject: string }) {
  const [confirming, setConfirming] = useState(false);
  const { status } = enquiry;

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm">
        <a href={`mailto:${enquiry.email}?subject=${encodeURIComponent(replySubject)}`}>
          <IconMail />
          {c.reply}
        </a>
      </Button>
      {status === "read" && (
        <Button variant="outline" size="sm">
          <IconMailOpened />
          {c.markUnread}
        </Button>
      )}
      {status === "archived" ? (
        <Button variant="outline" size="sm">
          <IconInboxOff />
          {c.restore}
        </Button>
      ) : (
        <Button variant="outline" size="sm">
          <IconArchive />
          {c.archive}
        </Button>
      )}
      <Button variant="outline" size="sm" className="text-destructive" onClick={() => setConfirming(true)}>
        <IconTrash />
        {c.delete}
      </Button>

      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{c.delete}</DialogTitle>
            <DialogDescription>{c.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" size="sm">
                {adminCopy.form.cancel}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="destructive" size="sm">
                {c.delete}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
