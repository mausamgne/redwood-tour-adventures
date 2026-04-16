import Button from "../common/Button";
import PrimaryButton from "../common/PrimaryButton";
import Heading from "../common/Heading";
export default function QueryCTA({ title, contactNumber, chatLink }) {
  if (!title) return null;
 
  return (
    <section className="w-full bg-gray-100 py-13 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Box */}
        <div
          className="border border-green-700 rounded-2xl px-8 py-9
                        flex flex-col lg:flex-row
                        items-center justify-between
                        gap-8 bg-white shadow-sm"
        >
          {/* Left Side */}
          <Heading as="h2"className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary text-center lg:text-left">
            {title}
          </Heading>
 
          {/* Right Side Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Call Button */}
            <Button
              as="a"
              href={`tel:${contactNumber}`}
              variant="outline"
              size="lg"
              className="rounder-full text-primary border bg-gray-700"
            >
              Call Us Now
            </Button>
 
            {/* Live Chat Button */}
            {chatLink && (
              <PrimaryButton as="a" href={chatLink}>
                Live Chat
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}