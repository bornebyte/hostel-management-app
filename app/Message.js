import { getBroadcastMessages } from "@/app/actions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const Messages = async () => {
    const messages = await getBroadcastMessages();

    return (
        <div className="w-full px-48">
            <h1 className="text-3xl font-bold mb-6 text-center">Broadcast Messages</h1>
            <Accordion type="single" collapsible className="w-full">
                {
                    messages.map((message) => (
                        <AccordionItem value={message.id} key={message.id} className="w-full">
                            <AccordionTrigger>{message.subject}</AccordionTrigger>
                            <AccordionContent>
                                {message.message}
                                <br />
                                <br />
                                <Badge variant="outline">{message.sender_name} ({message.sender_role}) {new Date(message.created_at).toLocaleString()}</Badge>
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    );
};

export default Messages;