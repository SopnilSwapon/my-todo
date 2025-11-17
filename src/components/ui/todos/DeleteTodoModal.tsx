"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button";

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTodoModal({ open, onClose, onConfirm }: IProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="bg-white p-6 rounded-xl max-w-sm w-full text-center shadow-xl">
              <h2 className="text-lg font-semibold text-black mb-4">
                Are you sure you want to delete this task?
              </h2>

              <div className="flex justify-center gap-4 mt-5">
                <Button
                  className="bg-gray-300 text-black hover:bg-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={onConfirm}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
