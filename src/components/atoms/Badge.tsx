interface BadgeProps {
  text: string;
}

export default ({ text }: BadgeProps) => {
  return (
    <span className="inline-block bg-primary-light text-primary py-[5px] px-[12px] rounded-[20px] text-xs font-bold mb-[15px]">
      {text}
    </span>
  );
}
