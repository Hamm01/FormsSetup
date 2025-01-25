# 🔷 Universal Shadcn Form field with RHF and Tanstack Forms

A scalable, type-safe form architecture built on top of **Shadcn UI** that works seamlessly with:

- ✅ React Hook Form
- ✅ TanStack Form

This project focuses on building a **single reusable input system** that supports **multiple form libraries** without duplicating components or logic.

---

## ✨ Core Highlights

- Built using **TypeScript Generics**
- Supports **React Hook Form** and **TanStack Form**
- Uses **Shadcn UI’s Field system**
- Modular layered architecture
- Fully reusable & scalable input components
- No form-library lock-in
- Strong focus on accessibility and error handling

---

## 📁 Folder Structure

```txt
src/
 ├── components/
 │   ├── ui/              → Shadcn UI primitives
 │   ├── inputs/          → Base reusable input components
 │   ├── form/            → tanstack Hooks and input components
 │   │   ├── tanstack/    → TanStack Form adapters
 │   │   └── shared/      → Shared types and utilities
 |   |   └── form.tsx     → all the Types and form base inputs for react hook form
 ├── schemas /            → Form project schema file


```

Components used:

```
<Field>

<FieldLabel>

<FieldDescription>

<FieldError>

<InputGroup>

<InputGroupAddon>
```

This keeps UI consistent across your entire app.

🧩 Shared TypeScript System

Your form fields are powered by generics like:

```ts
type FormControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  name: TName
  label: string
}
```

This ensures:

- Autocomplete for field names

- Strong type safety

- No invalid field access

- Better developer experience

🛠 Technologies Used

- React
- TypeScript
- Shadcn UI
- React Hook Form
- TanStack Form
- Tailwind CSS

❤️ Author

Built by Himanish
Focused on clean UI architecture and type-safe scalable systems.
